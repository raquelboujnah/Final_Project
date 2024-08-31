import { ReactElement, useState } from "react";
import dog_medal from "../assets/dog_medal2.png";
import whatsapp from '../assets/whatsapp.png';
import instagram from '../assets/instagram.png';
import download from '../assets/download.png';
import twitter from '../assets/twitter.png'
import TodoList from "./TodoList";

const EndOfSimulation = () : ReactElement => {
    const [showEndContainer, setShowEndContainer] = useState(true); // Controls visibility of end_container
    const [showTodoList, setShowTodoList] = useState(false);     
    const username = localStorage.getItem('capitalizedUsername');
    const perfomance = localStorage.getItem('performance');    

    const handleCloseAndShowTodoList = () => {
        setShowEndContainer(false);
        setShowTodoList(true);
    };

    const checkIfPassed = () : ReactElement => {
        if(Number(perfomance) > 120){
            return (
                <>
                    <button 
                        onClick={handleCloseAndShowTodoList} 
                        style={{ 
                            position: "absolute", 
                            top: "10px", 
                            right: "10px", 
                            background: "none", 
                            border: "none", 
                            fontSize: "20px", 
                            cursor: "pointer" 
                        }}
                    >X</button>
                    <p id="text_certificaded">Your performance get to {perfomance} so we are more than happy to annonce you that you are now a</p>
                    <p id="certificaded">certificaded future dog owner</p>
                    <button className="shadow-lg" id="share_button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasShare" aria-controls="offcanvasShare">Share</button>
                    <img src={dog_medal} alt="medal" id="dog_medal"/>

                    <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasShare" aria-labelledby="offcanvasShareLabel">
                        <div id="share_container" className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasShareLabel">Share with your friends and family or download to your images</h5>
                            <div className="offcanvas-body small" id="share_icons_container">
                                <img className="icons_share" src={whatsapp} alt="whatsapp_icon"/>
                                <img className="icons_share" src={instagram} alt="instagram_icon"/>
                                <img className="icons_share" src={download} alt="download_icon"/>
                                <img className="icons_share" src={twitter} alt="twitter_icon"/>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                    </div>
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
        <div>
            {showEndContainer && (
                <div id="end_container" className="shadow-lg">
                    <h3 id="congrats">Congrats {username}!!</h3>
                    <p>You have reached the end of the simulation</p>
                    {checkIfPassed()}
                </div>
            )}
            {showTodoList && <TodoList />}
        </div>
    )
};


export default EndOfSimulation