import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';


export default function Part1(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    

    // Handles the subscription form submission, sending the email to the backend.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        
        if (!email) {
            toast.warn("Please enter your email address.");
            return;
        }

        const token = localStorage.getItem('token');
        if(!token){
            toast.error("You need to login first!");
            navigate('/login');
            return;
        }

        const subscriptionPromise = fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email }),
        }).then(async (response) => {
            const result = await response.json();
            if (response.ok) {
                setEmail(''); // Clear the input on success
                return result.message; 
            } else {
                throw new Error(result.message || "Something went wrong.");
            }
        });

        toast.promise(
            subscriptionPromise,
            {
                pending: 'Subscribing...',
                success: {
                    render({data}){ return data; } // Render the success message from the promise
                },
                error: {
                    render({data}){ return data.message; } // Render the error message from the promise
                }
            }
        );
    };

    return (
        <div id="footer-top">
            <div id="subscribe-section">
                <div id="logo-subscribe">
                    <h1 id="name1">mockT</h1>
                    <p id="text1">Subscribe for the latest courses, tips, and updates. Join our learning community today!</p>
                </div>
                <form onSubmit={handleSubmit} id="form">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        id="form-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <button id="form-btn" type="submit">Subscribe</button>
                </form>
            </div>
            <div id="links-section">
                <div id="buss">
                    <h3 id="name2">mockT Bussiness</h3>
                    <a href="#" id="link1">Teach on mockT</a>
                    <a href="#" id="link2">Teaching Tools</a>
                    <a href="#" id="link3">mockT app</a>
                    <a href="#" id="link4">Contact us</a>
                </div>
                <div id="career">
                    <h3 id="name3">Careers</h3>
                    <a href="#" id="link5">Blog</a>
                    <a href="#" id="link6">Affiliate</a>
                    <a href="#" id="link7">Support</a>
                </div>
            </div>
        </div>
    )
}