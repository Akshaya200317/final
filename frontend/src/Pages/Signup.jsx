import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../Config/firebase';
import '../Styles/Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // For confirming the password
    const [error, setError] = useState(null); // For handling error messages
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/'); // Navigate if already authenticated
            }
        });
        return () => unsubscribe(); 
    }, [navigate]);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Registration successful");
                navigate('/'); // Navigate after successful registration
            })
            .catch((error) => {
                setError("Error during registration: " + error.message);
            });
    };

    return (
        <div className='signup-page'>
        <div className='signup-container'>
            <h3 className='signup-subtitle'>Signup:</h3>
            
            {error && <p className="signup-error">{error}</p>} {/* Display error messages */}

            <div className='signup-input-group'>
                <label htmlFor="inputEmail" className="signup-label">Email ID:</label>
                <input
                    type="email"
                    id="inputEmail"
                    className="signup-input"
                    onChange={(e) => { setEmail(e.target.value); }}
                />
            </div>
            <div className='signup-input-group'>
                <label htmlFor="inputPassword" className="signup-label">Password:</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="signup-input"
                    onChange={(e) => { setPassword(e.target.value); }}
                />
            </div>
            <div className='signup-input-group'>
                <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="signup-input"
                    onChange={(e) => { setConfirmPassword(e.target.value); }}
                />
                <div className="signup-password-help">
                    Your password must be more than 6 characters long.
                </div>
            </div>
            <p className='signup-footer'>
                Already have an account? Please login <Link to={'/'}>here</Link>.
            </p>
            <button type="button" className="signup-button" onClick={handleSignup}>Sign Up</button>
        </div>
        </div>
    );
};

export default Signup;
