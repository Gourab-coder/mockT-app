import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header_home from '../../components/Header/Header';
import { handleError, handleSuccess } from "../../Utils";
import "./file.css";

export default function Login() {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    // Handles input changes and updates the login form state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    // Handles form submission, sends credentials to the backend, and manages the response.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = "http://localhost:1001/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                localStorage.setItem('profilePhoto', "");
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError("Login failed. Please check your credentials or try again later.");
        }
    }

    return (
        <>
        <Header_home/>
        <div className='login-center'>
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Does't have an account ?
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
        </>
    )
}