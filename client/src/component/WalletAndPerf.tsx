import { ReactElement, useEffect } from "react";
import {walletUpdate} from "../features/wallet/walletUpdate";
import {perfUpadte} from "../features/performance/perfUpdate";
import { useWalletDecrement, useWalletSelector, useSetWallet } from "../features/wallet/walletHooks";
import { usePerfDecrement, useIncrement, usePerfSelector, useSetPerf } from "../features/performance/perfHooks";

interface PropsInterface {
    action: string;
    time?: string;
    num?: number;
    image?: string;
    onDismiss?: () => void;
}

const WalletAndPerf = ({action, time, num, image, onDismiss} : PropsInterface) : ReactElement => {

    const walletDecrement = useWalletDecrement()
    const wallet = useWalletSelector()
    const setWallet = useSetWallet()
    const perfDecrement = usePerfDecrement();
    const performance = usePerfSelector();
    const setPerf = useSetPerf();
    const perfIncrement = useIncrement();


    useEffect(() => {
        const wallet_status = localStorage.getItem('wallet_status')
        setWallet(Number(wallet_status));
    }, [setWallet]);

    useEffect(() => {
        const performance = localStorage.getItem('performance');        
        setPerf(Number(performance));
    }, [setPerf]);


    const handleYes = () => {
        if (num){
            walletDecrement(num)
            walletUpdate(wallet - num)
        }
        perfIncrement(1);
        perfUpadte(performance + 1);
        if (onDismiss) onDismiss();
    };

    const handleNo = () => {
        perfDecrement(1);
        perfUpadte(performance - 1);
        if (onDismiss) onDismiss();
    };


    return (
        <>
            {num && <p id="cost">Cost: {num}</p>}
            {time && <p id="time">Time: {time}</p>}
            <button id="yes_button" onClick={handleYes}>{action}</button>
            <button id="no_button" onClick={handleNo}>No</button>
            <img id="img_alert" src={image}/>
        </>
    ) 
};

export default WalletAndPerf;