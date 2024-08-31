import { ReactElement, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Register = () : ReactElement => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const breedRef = useRef<HTMLSelectElement>(null);
    const dogNameRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate()

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const username = usernameRef.current?.value.trim();
        const email = emailRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();
        const dog_breed = breedRef.current?.value;
        const dog_name = dogNameRef.current?.value.trim();

        if (!username || !email || !password || !dog_name) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/dog/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    dog_breed,
                    dog_name
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                const capitalizedUsername = capitalizeFirstLetter(data.user[0].username);
                const capitalizedDogName = capitalizeFirstLetter(data.user[0].dog_name);
                localStorage.setItem('capitalizedUsername', capitalizedUsername);
                localStorage.setItem('username', data.user[0].username);
                localStorage.setItem('dog_breed', data.user[0].dog_breed);
                localStorage.setItem('dog_name', capitalizedDogName);
                localStorage.setItem('register_date', data.user[0].register_date);
                localStorage.setItem('wallet_status', data.user[0].wallet_status);
                localStorage.setItem('performance', data.user[0].performance);
                setSuccessMessage("User registered successfully!");
                navigate('/firstday');
            } else if (response.status === 200) {
                setErrorMessage(data.messgae || "Email or Username already exists.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Internal server error. Please try again later.");
        }
    };

    return (
        <div  id="register_form">
            <h3 id="register_title">Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Username" ref={usernameRef}/> 
                    <label>Username</label>
                </div>  
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" placeholder="Email" ref={emailRef}/>
                    <label>Email address</label>
                </div>   
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Password" ref={passwordRef}/> 
                    <label>Password</label>
                </div> 
                <div className="mb-3">
                    <label className="form-label">Choose your dream dog</label>
                    <select className="form-select" aria-label="Default select example" ref={breedRef}>
                        <option value={'default'}>Default</option>
                        <option value={'labrador'}>Labrador</option>
                        <option value={'chihuahua'}>Chihuahua</option>
                        <option value={'husky'}>Husky</option>
                        <option value={'dachshund'}>Dachshund</option>
                        <option value={'golden retriever'}>Golden Retriever</option>
                        <option value={'cocker'}>Cocker</option>
                        <option value={'shih tzu'}>Shih Tzu</option>
                        <option value={'pomeranian'}>Pomeranian</option>
                        <option value={'rottweiler'}>Rottweiler</option>
                        <option value={'german shepherd'}>German Shepherd</option>
                        <option value={'pitbull'}>Pitbull</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Dog's name" ref={dogNameRef}/> 
                    <label>Dog's name</label>
                </div>
                <input type="submit" id="submit_register" value={'Register'}/>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <Link to="/login" id="to_login" className="btn">Login</Link>
           
        </div>
    );
};

export default Register;