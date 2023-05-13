import React from 'react';
import { useState } from 'react'

import "./login.css";
import asyncPostCall from "../service.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
function Login({ setToken }) {
    function isPasswordValid(password) {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
    function validatedEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }
    const navigate = useNavigate();
    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        });
    const handleRegister = async (e) => {
        e.preventDefault();
        const req = {
            email: login?.email,
            password: login?.password
        }
        if ((validatedEmail(login?.email) && isPasswordValid(login?.password)) == false) {
            toast.warning("Please fill details correctly");

            setLogin({
                email: "",
                password: ""
            });
            return;
        } else {
            const data = await asyncPostCall("/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            });
            if (data && typeof data == "string") {
                localStorage.setItem("token", data);

                setLogin({
                    email: "",
                    password: ""
                });
                toast.success("Login succefully")
                setToken(data)
                navigate("/upload-img");

            } else {
                setLogin({
                    email: "",
                    password: ""
                });
                toast.error("Invalid  data eamil && password")
                return;
            }
        }
    }
    const NaviGateToSignUpage = () => {
        navigate("/sign-up");
    }
    const handleSignOnchange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });

    }

    return (
        <div className="container">
            <div className="title">Login</div>
            <div >
                <form className="content" onSubmit={(e) => handleRegister(e)}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;:</span>
                            <input className="text-type-box" type="text" name='email' onChange={(e) => handleSignOnchange(e)} placeholder="Enter your email" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Password :</span>
                            <input className="text-type-box" type="password" name='password' onChange={(e) => handleSignOnchange(e)} placeholder="Enter your password" required />
                        </div>
                    </div>

                    <div >
                        <input className="button" type="submit" value="Login" />
                    </div>
                </form>
            </div>
            <div className='last-content'><span>You don't have Account please press the </span>
                <span className='last-content-span' onClick={NaviGateToSignUpage}> Signup ?</span></div>
        </div>
    )
}

export default Login;