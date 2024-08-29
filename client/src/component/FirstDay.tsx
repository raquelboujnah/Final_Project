import { ReactElement, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSetWallet } from "../features/wallet/walletHooks";
import { walletUpdate } from "../features/wallet/walletUpdate";
import WalletAndPerf from "./WalletAndPerf";
import happyDogImage from '../assets/happy_dog.png'

const FirstDay = () : ReactElement=> {
    const username = localStorage.getItem('capitalizedUsername');
    const dog_name = localStorage.getItem('dog_name');
    const budgetRef = useRef<HTMLInputElement>(null);
    const setWallet = useSetWallet()
    const navigate = useNavigate(); 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const budget = budgetRef.current?.value;        
        setWallet(Number(budget))
        walletUpdate(Number(budget))
    };

    const handleStart = () => {
        navigate('/');
    };

    return(
        <div id="firstday_container">  
            <img id="happy_dog" src={happyDogImage} alt="happy dog"/>
            <h4 id="first_welcome">Hi {username}, welcome to our app</h4>
            <p>First, we want you to set the budget that you think will be enough for one month with a dog</p>
            <p>You will be able to "add" more money if needed</p>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Budget" ref={budgetRef}/> 
                    <label>Budget</label>
                </div>
                <input type="submit" className="btn btn-outline-success btn-sm" value={'Set budget'}/>
            </form>
                        
            <h3>Congrats {username}, you finally have a dog!</h3>
            <p>But before you go play with your new bestfriend, there is a couple things you need to do:</p>
            <p>{dog_name} has miss one vaccine, you will need to take him to the vet ASAP.</p>
            <WalletAndPerf time="1 hour" num={50} action="Well, let's go"/>
            <p>You must go buy a bed for him, so he has his own place, it's really important for a dog. And of course, if you already there, you must buy him 2 or 3 toys.</p> 
            <WalletAndPerf time="30 hour" num={50} action="Great!"/>

            <h3>Are you ready to start this new experience with us?</h3>
            <button onClick={handleStart}>Let's start</button>
        </div>
    );
};
 export default FirstDay;