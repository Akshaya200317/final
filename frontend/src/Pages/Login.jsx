import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../Config/firebase';
import '../Styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/landing');
            }
        });
        return () => unsubscribe(); 
    }, [navigate]);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/landing');
            }).catch(error => alert("No account found, kindly sign up first."));
    };

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='login-title'>Welcome to ClothStore</h1>
                <h3 className='login-subtitle'>Login:</h3>
                <div className='login-input-group'>
                    <label className='login-label' htmlFor="inputEmail">Email ID:</label>
                    <input
                        className='login-input'
                        type="email"
                        id="inputEmail"
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                </div>
                <div className='login-input-group'>
                    <label className='login-label' htmlFor="inputPassword">Password:</label>
                    <input
                        className='login-input'
                        type="password"
                        id="inputPassword"
                        onChange={(e) => { setPassword(e.target.value); }}
                    />
                    <div className='login-password-tip'>
                        Your password must be more than 6 characters long.
                    </div>
                </div>
                <p className='login-footer'>
                    Don't have an account? Please create one <Link to={'/signup'}>here</Link>.
                </p>
                <button className='login-button' type="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
