import { ReactElement, useState } from "react";
import WalletAndPerf from "./WalletAndPerf";
import dog_sick from '../assets/dog_sick.png';

const DogSick = (): ReactElement | null => {
    const dog_name = localStorage.getItem('dog_name');
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return(
        <>
            <h5>{dog_name} is sick! He throw up all over your rog...</h5>
            <p className="question">Can you take him to the vet ASAP?</p>
            <WalletAndPerf time="1 hour" action="Let's go" num={50} image={dog_sick} onDismiss={handleDismiss}/>
        </>
    );
};

export default DogSick;
