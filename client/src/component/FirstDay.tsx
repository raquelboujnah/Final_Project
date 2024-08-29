import { ReactElement, useRef } from "react";
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
        <>
            <div id="welcome_container">
                <img id="happy_dog" src={happyDogImage} alt="happy dog"/>
                <h4 id="welcome">Hi {username}, welcome to our app</h4>
            </div>
            <div id="firstday_container">  
                <h3>Congrats {username}, you finally have a dog!</h3>
                <p>First, we want you to set the budget that you think will be enough for one month with a dog</p>
                <p>You will be able to "add" more money if needed</p>
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Budget" aria-label="Budget" aria-describedby="button-addon2" ref={budgetRef}/>
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Set</button>
                </div>
                </form>
                <h5>Now, before you go play with your new bestfriend, there is a couple things you need to do:</h5>
                <div className="container_first_things">
                    <h6>{dog_name} has miss one vaccine, you will need to take him to the vet ASAP.</h6>
                    <WalletAndPerf time="1 hour" num={50} action="Well, let's go" id_yes="yes_button_first_day"  id_no="no_button_first_day"/>
                </div>
                <div className="container_first_things">
                    <h6>You must go buy a bed for him, so he has his own place, it's really important for a dog. And of course, if you already there, you must buy him 2 or 3 toys.</h6> 
                    <WalletAndPerf time="30 hour" num={50} action="Great!" id_yes="yes_button_first_day"  id_no="no_button_first_day"/>
                </div>
                <h3>Are you ready to start this new experience with us?</h3>
                <button onClick={handleStart} id="start">Let's start</button>
            </div>
        </>
    );
};
 export default FirstDay;