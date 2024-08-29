import React, { ReactElement, useEffect, useMemo, useState } from "react";
import BuyFood from "./BuyFood";
import DogSick from "./DogSick";
import DogAttention from "./DogAttetntion";
import funFact from "./FunFact";
import NeedDogSit from "./NeedDogSit";
import FirstDay from "./FirstDay";
import {displayDayNum} from "./DayCount";
import EndOfSimulation from "./EndOfSimulation";
import BathTime from "./BathTime";
import IconsWalletAndPerf from "./IconsWalletAndPerf";
import happyDogImage from '../assets/happy_dog.png';
import asking_dog from '../assets/asking_dog.png';
import walk_dog from '../assets/walk_dog.png';
import eat_dog from '../assets/eat_dog.png';
import WalletAndPerf from "./WalletAndPerf";

const Home = () : ReactElement => {
    const capitalizedUsername = localStorage.getItem('capitalizedUsername');
    const dayCount = useMemo(() => displayDayNum(), [])
    const [actionComponent, setActionComponent] = useState<ReactElement | null>(null);
    const [currentHour, setCurrentHour] = useState<string>("");
    const [walkContent, setWalkContent] = useState<ReactElement | null>(null);
    const [feedContent, setFeedContent] = useState<ReactElement | null>(null);
    const [funfactContent, setFunfactContent] = useState<string | null>(null);
    const [isActionComponentVisible, setIsActionComponentVisible] = useState<boolean>(true);
    const [attentionTimes, setAttentionTimes] = useState<string[]>([])
    const day_funFact = localStorage.getItem('day_funFact')

    const feedingTimes : string[] = ["08:30", "20:30"];
    const walkingTimes : string[] = ["07:30", "13:00", "19:30"];

    const createRandomTimes = (): void => {
        const randomTimes: string[] = [];
    
        for (let i = 0; i < 2; i++) {
            const hours = Math.floor(Math.random() * 24);
            const minutes = Math.floor(Math.random() * 60);
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            randomTimes.push(formattedTime);            
        }
        setAttentionTimes(randomTimes);
        
    };
    
    useEffect(() => {
        if (isActionComponentVisible) {
            setActionComponent(actionsPerDay());
        }
    }, [dayCount, isActionComponentVisible]);

    useEffect(() => {
        updateHour(); 
        const intervalId = setInterval(updateHour, 60 * 1000); 
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        walkPerHour(currentHour);
        feedPerHour(currentHour);
        attentionPerHour(currentHour);
        funfactDisplay(currentHour);
    }, [currentHour]);

    const updateHour = () : void => {
        const now = new Date();
        const hour = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        setCurrentHour(hour);
        if (hour === "06:00") {
            createRandomTimes();
        }
    };

    const calculateTimeDifference = (currentHour: string, eventTimes: string[], action: string): string => {
        const [currentHourStr, currentMinuteStr] = currentHour.split(":").map(Number);
        const currentMinutes = currentHourStr * 60 + currentMinuteStr;
        let nextEventMinutes = Infinity;

        eventTimes.forEach(time => {
            const [hourStr, minuteStr] = time.split(":").map(Number);
            const eventMinutes = hourStr * 60 + minuteStr;
            
            if (eventMinutes > currentMinutes) {
                nextEventMinutes = Math.min(nextEventMinutes, eventMinutes);
            }
        });
    
        if (nextEventMinutes === Infinity) {
            return `No more ${action} today`;
        };
    
        const diffMinutes = nextEventMinutes - currentMinutes;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
    
        return `${hours} hours and ${minutes} minutes`;
    };

    const actionsPerDay = () : ReactElement | null => {
        if(dayCount === 10 || dayCount === 20 || dayCount === 29){                                    
            return <BuyFood/>;
        }else if(dayCount === 15){
            return <DogSick/>;
        }else if(dayCount === 18){
            return <BathTime/>;
        }else if(dayCount === 1){
            return <NeedDogSit/>;
        }else return null
    };

    const walkPerHour = (hour: string): void => {
        if (hour === '7:30' || hour === '13:23' || hour === '19:30') {
            setWalkContent(
                <>
                    <h5 className="walk_content">It's time to walk your dog!</h5>
                    <WalletAndPerf time="1 hour" action="I will get ready" />
                </>
            );
        }else {
            setWalkContent(
                <>
                    <h5 className="walk_content">Next walk in:</h5>
                    <h5 className="walk_content">{calculateTimeDifference(currentHour, walkingTimes, 'walk')}</h5>
                </>
            );
        }
    };

    const feedPerHour = (hour: string): void => {
        if (hour === '8:30' || hour === '20:30') {
            setFeedContent(
                <>
                    <h5 className="walk_content">It's time to feed your dog!</h5>
                    <WalletAndPerf time="5 minutes" action="Yummi" />
                </>
            );
        }else {
            setFeedContent(
                <>
                    <h5 className="walk_content">Next feed in:</h5>
                    <h5 className="walk_content">{calculateTimeDifference(currentHour, feedingTimes, 'feed')}</h5>
                </>
            );
        }
    };
    const setFact = async () => {
        const fact = await funFact();                
        return fact.funfacts
    }


    const funfactDisplay = async(hour: string) => {
        if (hour === '10:12') {
            const day_funFact = await setFact()            
            localStorage.setItem('day_funFact', day_funFact);
        }
    };

    const attentionPerHour = (hour: string): void => {
        if (attentionTimes.includes(hour)) {
            setActionComponent(
                <>
                    <DogAttention/>
                </>
            );
        }
    };


    const hideActionComponent = () => {
        setIsActionComponentVisible(false);
    };

    return (
        <>
            <IconsWalletAndPerf/>
            {dayCount === 30 ?(
                <EndOfSimulation/>
            ) : (
                <>
                    <div id="welcome_container">
                        <img id="happy_dog" src={happyDogImage} alt="happy dog"/>
                        <h4 id="welcome">Hi {capitalizedUsername}, welcome back!</h4>
                    </div>
                    <div id="fun_fact">
                        <h3 className="fun_fact_content">Did you know about that one?</h3>
                        {day_funFact ? <p className="fun_fact_content">{day_funFact}</p> : <p>Loading...</p>}                    
                    </div>
                    {/* <img id="asking_dog" src={asking_dog} alt="asking dog"/> */}
                    <div id="walk_container">
                        {walkContent}
                        <img id="walk_dog" src={walk_dog} alt="walk dog"/>
                    </div>
                    <div id="feed_container">
                        {feedContent}
                        <img id="eat_dog" src={eat_dog} alt="eat dog"/>
                    </div>
                    <div id="alert_container">
                        {isActionComponentVisible && actionComponent ? (
                            <div>
                                {React.cloneElement(actionComponent, { onDismiss: hideActionComponent })}
                            </div>
                        ) : (
                            <h3 id="no_alert">No alert for now</h3>
                        )}
                    </div>
                    <div id="one_more_container"></div>
                </>
                ) 
            }
        </>
    );
};

export default Home;