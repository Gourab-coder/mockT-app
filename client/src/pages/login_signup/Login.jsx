import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "./file.css"
import Header_home from '../../components/Header/Header';

export default function Login() {
    return (
        <>
        <Header_home/>
        <div className='login-center'>
            <div className='container'>
                <h1>Login</h1>
                <form >
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Does't have an account ?
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
        </>
    )
}