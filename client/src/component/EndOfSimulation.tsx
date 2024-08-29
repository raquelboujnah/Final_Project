import { ReactElement } from "react";
import dog_medal from "../assets/dog_medal2.png"

const EndOfSimulation = () : ReactElement => {
    const username = localStorage.getItem('capitalizedUsername');
    const perfomance = localStorage.getItem('performance');    

    const checkIfPassed = () : ReactElement => {
        if(Number(perfomance) > 20){
            return (
                <>
                    <p id="text_certificaded">Your performance get to {perfomance} so we are more than happy to annonce you that you are now a</p>
                    <p id="certificaded">certificaded future dog owner</p>
                    <button id="share_button">Share</button>
                    <img src={dog_medal} alt="medal" id="dog_medal"/>
                </>
            )
        }else{
            return (
                <>
                    <p>We are sorry to annone you that your performance is too lwo for certified you...</p>
                    <p>But we strongly recommande you to do our simulation again, we are sure you can make it!{perfomance}</p>
                </>
            )
        }
    }


    return (
        <div id="end_container" className="shadow-lg">
            <h3 id="congrats">Congrats {username}!!</h3>
            <p>You get to the end of the simulation</p>
            {checkIfPassed()}
        </div>
    )
};

export default EndOfSimulation