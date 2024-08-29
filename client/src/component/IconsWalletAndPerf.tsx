import { ReactElement, useRef, useEffect, useState } from "react";
import performance_icon from '../assets/dog_medal.png';
import wallet_icon from '../assets/wallet.png';
import coins from '../assets/coins.png';
import { useWalletIncrement, useWalletSelector } from "../features/wallet/walletHooks";
import { walletUpdate } from "../features/wallet/walletUpdate";
import { usePerfSelector } from "../features/performance/perfHooks";
import contact from "../assets/contact.png"

const IconsWalletAndPerf = () : ReactElement => {
    const [walletStatus, setWalletStatus] = useState<number>(0);
    const [performance, setPerformance] = useState<number>(0);
    const wallet = useWalletSelector()
    const refellRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const increment = useWalletIncrement()
    const perf = usePerfSelector()

    useEffect(()=>{
        const walletValue = Number(localStorage.getItem('wallet_status')) || 0;
        const performanceValue = Number(localStorage.getItem('performance')) || 0;
        setWalletStatus(walletValue);
        setPerformance(performanceValue);
    }, []);

    useEffect(() => {
        setWalletStatus(wallet);
        setPerformance(perf);
    }, [wallet, perf]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const refell = refellRef.current?.value;        
        increment(Number(refell))
        walletUpdate(wallet + Number(refell));
    }

    return(
        <>
            <nav>
                <div id="wallet">
                    <img id="wallet_icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWallet" aria-controls="offcanvasWallet" src={wallet_icon} alt="wallet"/>
                    <p id="wallet_status">{walletStatus}$</p>
                </div>
                <div id="performance">
                    <img id="performance_icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasPerformance" aria-controls="offcanvasPerformance" src={performance_icon} alt="performance"/>                   
                    <p id="performance_status">{performance}</p>
                </div>
                <div id="contact">
                    <img id="contact_icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasContact" aria-controls="offcanvasContact" src={contact} alt="contact"/>                   
                    <p>contact us</p>
                </div>
            </nav>

            <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasWallet" aria-labelledby="offcanvasWalletLabel" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWalletLabel">Refell your wallet</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Enter here the amout" ref={refellRef}/> 
                            <label>Enter here the amout</label>
                        </div>
                        <input type="submit" className="btn btn-outline-success btn-sm" value={'Refell'}/>
                    </form>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
            <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasPerformance" aria-labelledby="offcanvasPerformanceLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasPerformanceLabel">Performance Details</h5>
                    <div className="offcanvas-body small">
                        <p>Your current performance status is {performance}.</p>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
            <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasContact" aria-labelledby="offcanvasContactLabel" >
                <div className="offcanvas-header" id="contact_container">
                    <h5 className="offcanvas-title" id="offcanvasContactLabel">Fell free to talk to us about the app</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <textarea placeholder="Message" rows={4} cols={40}></textarea>                            
                        </div>
                        <input type="submit" className="btn btn-outline-success btn-sm" value={'Send'}/>
                    </form>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>
        </>
    );
};

export default IconsWalletAndPerf;