import { ReactElement, useState } from "react";
import WalletAndPerf from "./WalletAndPerf";

const BathTime = () : ReactElement | null=> {
    const dog_name = localStorage.getItem('dog_name')
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }
    return (
        <>
            <h5>It's bath time!</h5>
            <p className="question">{dog_name} really could use a good bath rigthh now, would you?</p>
            <WalletAndPerf action="Ok" time="1 hour" onDismiss={handleDismiss}/>
        </>
    );
};

export default BathTime;
