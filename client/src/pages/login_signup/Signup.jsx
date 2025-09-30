import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Header_home from '../../components/Header/Header';

export default function Signup(){
    return (
        <>
        <Header_home/>
        <div className='login-center'>
            <div className='container'>
                <h1>Signup</h1>
                <form >
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                        />
                    </div>
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
                    <button type='submit'>Signup</button>
                    <span>Already have an account ?
                        <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
        </>
    )
}