import { ReactElement, useState } from "react";
import WalletAndPerf from "./WalletAndPerf";
import buy_food from '../assets/buy_food.png';


const BuyFood = (): ReactElement | null => {
    const dog_name = localStorage.getItem('dog_name');
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }
    
    return (
        <>
            <h5>You went out of food for {dog_name}...</h5>
            <p className="question">Can you go buy him more food?</p>
            <WalletAndPerf action="Let's go" time="20 minutes" num={20} image={buy_food} onDismiss={handleDismiss}/>
        </>
    );
};

export default BuyFood;
