
import { ReactElement, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (): ReactElement => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const username = usernameRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();

        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/dog/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            const data = await response.json();

            if (response.status === 200 && data.message === 'Login succesfull') {
                const capitalizedUsername = capitalizeFirstLetter(data.user.username);
                const capitalizedDogName = capitalizeFirstLetter(data.user.dog_name);
                localStorage.setItem('capitalizedUsername', capitalizedUsername);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('dog_breed', data.user.dog_breed);
                localStorage.setItem('dog_name', capitalizedDogName);
                localStorage.setItem('register_date', data.user.register_date);
                localStorage.setItem('wallet_status', data.user.wallet_status);
                localStorage.setItem('performance', data.user.performance);
                setSuccessMessage("Login successful! Redirecting...");
                navigate('/');
            } else if (response.status === 404) {
                setErrorMessage(data.message || "User not found. Please check your credentials.");
            } else if (response.status === 401) {
                setErrorMessage("Authentication failed. Please check your username and password.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Internal server error. Please try again later.");
        }
    };

    return (
        <div id="login_form">
            <h3 id="login_title">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Username" ref={usernameRef} />
                    <label>Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Password" ref={passwordRef} />
                    <label>Password</label>
                </div>
                <input type="submit" id="submit_login" value={'Log in'} />
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <Link to="/register" id="to_register" className="btn btn-outline-info btn-sm">Register</Link>
        </div>
    );
};

export default Login;