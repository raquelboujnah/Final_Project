import { ReactElement, useState } from "react";
import WalletAndPerf from "./WalletAndPerf";
import dog_attention from '../assets/dog_attention.png';

const DogAttention = (): ReactElement | null=> {
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
            <h5>{dog_name} needs your attention!</h5>
            <p className="question">Can you pause everything to be with him?</p>
            <WalletAndPerf action="Yes of course" time="30 minutes" image={dog_attention} onDismiss={handleDismiss}/>
        </>
    );
};

export default DogAttention;

