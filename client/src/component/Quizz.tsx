import { ReactElement } from "react"
import WalletAndPerf from "./WalletAndPerf"
import { useNavigate } from "react-router-dom"

const Quizz = () : ReactElement => {
    const navigate = useNavigate()
    const questions : string[] = ["Are you willing to make lifestyle changes to accommodate a dog, such as waking up earlier for walks or adjusting travel plans?",
        "Are you prepared for the long-term commitment of owning a dog (10-15 years or more)?",
        "Do you have enough space in your home for a dog?",
        "Do you have a yard or a dog park nearby for exercises?",
        "Do you have a financial plan for unexpected expenses, such as emergency vet visits?",
        "Do you have any concerns about allergies, either for yourself or others in your household?",
        "Are you aware of the specific needs and characteristics of the breed you're considering?",
        "Are your living and financial situation stable for taking care of a dog?",
        "Are you aware of the amout of time you will need to give your dog?"]

    const home = () => {
        navigate('/home')
    }

    return(
        <div id="quest_container">
            <h4>We prepare for you a small quizz, take the time to really think about each question</h4>
            {questions.map(quest =>{
                return(
                    <div className="quest">
                        <p className="quest_text">{quest}</p>
                        <div>
                            <WalletAndPerf action="Yes" id_no="quest_no" id_yes="quest_yes"/>
                        </div>
                    </div>
                )
            })}
            <button id="to_home_from_quizz" onClick={home}>Home page</button>
        </div>
        
    )
}
export default Quizz;