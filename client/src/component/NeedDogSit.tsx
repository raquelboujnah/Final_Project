import { ReactElement, useState } from "react";
import WalletAndPerf from "./WalletAndPerf";

const NeedDogSit = (): ReactElement | null => {
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
            <h5>You was invited for the weekend to your friend's penthouse, but he HATES dogs...</h5>
            <p className="question">Would you call a dogsit for your little {dog_name}?</p>
            <WalletAndPerf num={30} action="Yes" onDismiss={handleDismiss}/>
        </>
    );
};

export default NeedDogSit;

