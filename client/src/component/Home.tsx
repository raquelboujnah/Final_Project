import React, { ReactElement, useEffect, useMemo, useState } from "react";
import BuyFood from "./BuyFood";
import DogSick from "./DogSick";
import DogAttention from "./DogAttetntion";
import funFact from "./FunFact";
import NeedDogSit from "./NeedDogSit";
import {displayDayNum} from "./DayCount";
import EndOfSimulation from "./EndOfSimulation";
import BathTime from "./BathTime";
import IconsWalletAndPerf from "./NavBar";
import happyDogImage from '../assets/happy_dog.png';
import walk_dog from '../assets/walk_dog.png';
import eat_dog from '../assets/eat_dog.png';
import WalletAndPerf from "./WalletAndPerf";
import deleteFunfact from "./deleteFunfact";

const Home = () : ReactElement => {
    const capitalizedUsername = localStorage.getItem('capitalizedUsername');
    const dayCount = useMemo(() => displayDayNum(), [])
    const [actionComponent, setActionComponent] = useState<ReactElement | null>(null);
    const [currentHour, setCurrentHour] = useState<string>("");
    const [walkContent, setWalkContent] = useState<ReactElement | null>(null);
    const [feedContent, setFeedContent] = useState<ReactElement | null>(null);
    const [trainContent, setTrainContent] = useState<ReactElement | null>(null);
    const [isActionComponentVisible, setIsActionComponentVisible] = useState<boolean>(true);
    const day_funFact = localStorage.getItem('day_funFact');
    const dog_breed = localStorage.getItem('dog_breed');

    const feedingTimes : string[] = ["08:30", "20:30"];
    const trainingTimes : string[] = ["13:00", "19:00"];
    const walkingTimes2 : string[] = ["08:00", "18:30"];
    const walkingTimes3 : string[] = ["07:30", "13:00", "19:30"];

    
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
        trainPerHour(currentHour)
        attentionPerHour(currentHour);
        funfactDisplay(currentHour);
    }, [currentHour]);

    const updateHour = () : void => {
        const now = new Date();
        const hour = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        setCurrentHour(hour);
    };

    // const createRandomTimes = (): string[] => {
    //     const randomTimes: string[] = [];
    //     for (let i = 0; i < 2; i++) {
    //         const hours = Math.floor(Math.random() * 24);
    //         const minutes = Math.floor(Math.random() * 60);
    //         const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    //         randomTimes.push(formattedTime); 
    //     };
    //     return randomTimes;
        
    // };

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
        if(dog_breed === 'default' || dog_breed === 'dachshund' || dog_breed === 'cocker' || dog_breed === 'pomeranian'){
            if(dayCount === 15 || dayCount === 29){                                    
                return <BuyFood/>;
            }else if(dayCount === 15){
                return <DogSick/>;
            }else if(dayCount === 18){
                return <BathTime/>;
            }else if(dayCount === 13){
                return <NeedDogSit/>;
            }
        }
        else if(dog_breed === 'labrador' || dog_breed === 'husky' || dog_breed === 'golden retriever' || dog_breed === 'german shepherd'){
            if(dayCount === 10 || dayCount === 20 || dayCount === 29){                                    
                return <BuyFood/>;
            }else if(dayCount === 15){
                return <DogSick/>;
            }else if(dayCount === 18){
                return <BathTime/>;
            }else if(dayCount === 13){
                return <NeedDogSit/>;
            }
        }
        else if(dog_breed === 'chihuahua' || dog_breed === 'shih tzu'){
            if(dayCount === 15 || dayCount === 29){                                    
                return <BuyFood/>;
            }else if(dayCount === 18){
                return <BathTime/>;
            }else if(dayCount === 13){
                return <NeedDogSit/>;
            }
        }
        else if(dog_breed === 'bulldog' || dog_breed === 'rottweiler'){
            if(dayCount === 10 || dayCount === 20 || dayCount === 29){                                    
                return <BuyFood/>;
            }else if(dayCount === 15){
                return <DogSick/>;
            }else if(dayCount === 9 || dayCount === 23){
                return <BathTime/>;
            }else if(dayCount === 13){
                return <NeedDogSit/>;
            }
        }return null
        
    };

    // const hideWalkContent = (): void => setWalkContent(null);
    // const hideFeedContent = (): void => setFeedContent(null);
    // const hideTrainContent = (): void => setTrainContent(null);

    const walkPerHour = (hour: string): void | null => {
        if (dog_breed === 'default' || dog_breed === 'chihuahua' || dog_breed === 'dachshund' || dog_breed === 'labrador' || dog_breed === 'golden retriever' || dog_breed === 'cocker' || dog_breed === 'shih tzu' || dog_breed === 'pomeranian' || dog_breed === 'bulldog'){
            if (hour === '8:41' || hour === '18:30') {
                setWalkContent(
                    <>
                        <h5 className="walk_content">It's time to walk your dog!</h5>
                        <WalletAndPerf time="25 minutes" action="I will get ready"/>
                    </>
                );
            }else {
                setWalkContent(
                    <>
                        <h5 className="walk_content">Next walk in:</h5>
                        <h5 className="walk_content">{calculateTimeDifference(currentHour, walkingTimes2, 'walk')}</h5>
                    </>
                );
            }
        }else if (dog_breed === 'rottweiler' || dog_breed === 'german shepherd' || dog_breed === 'husky'){
            if ( hour === '7:30' || hour === '13:23' || hour === '19:30') {
                setWalkContent(
                    <>
                        <h5 className="walk_content">It's time to walk your dog!</h5>
                        <WalletAndPerf time="45 minutes" action="I will get ready" />
                    </>
                );
            }else {
                setWalkContent(
                    <>
                        <h5 className="walk_content">Next walk in:</h5>
                        <h5 className="walk_content">{calculateTimeDifference(currentHour, walkingTimes3, 'walk')}</h5>
                    </>
                );
            }
        }
            
    };

    const trainPerHour = (hour: string): void => {
        if (hour === '13:00' || hour === '19:00') {
            setTrainContent(
                <>
                    <h5 className="train_content">It's time to train your dog!</h5>
                    <WalletAndPerf time="15 minutes" action="Okay!" />
                </>
            );
        }else {
            setTrainContent(
                <>
                    <h5 className="train_content">Next feed in:</h5>
                    <h5 className="train_content">{calculateTimeDifference(currentHour, trainingTimes, 'train')}</h5>
                </>
            );
        }
    }

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
    }

    const setFact = async (): Promise<string | null> => {
        try {
            const fact = await funFact();
            await deleteFunfact(fact.id)
            return fact.funfacts;
        } catch (error) {
            console.error('Error setting fun fact:', error);
            return null;
        }
    };

    const funfactDisplay = async (hour: string): Promise<void> => {
        if (hour === '6:00') {
            const dayFunFact = await setFact();
            if (dayFunFact) {
                localStorage.setItem('day_funFact', dayFunFact);
            }
        }
    };


    const attentionPerHour = (hour: string): void => {
        if (hour === '07:55' || hour === '17:23') {
            setActionComponent(<DogAttention/>);
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
                        {day_funFact ? <p className="fun_fact_content">{day_funFact}</p> : <p>During the Middle Ages, mixed breeds of peasant's dogs were required to wear blocks around their necks to keep them from breeding with noble hunting dogs. Purebred dogs were very expensive and hunting became the province of the rich.</p>}                    
                    </div>
                    <div id="walk_container">
                        {walkContent}
                        <img id="walk_dog" src={walk_dog} alt="walk dog"/>
                    </div>
                    <div id="feed_container">
                        {feedContent}
                        <img id="eat_dog" src={eat_dog} alt="eat dog"/>
                    </div>
                    <div id="train_container">
                        {trainContent}
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