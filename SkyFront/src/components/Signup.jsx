import React, { useState } from 'react'
import "./signup.css";
import asyncPostCall from "../service.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
/// import 'react-toastify/dist/ReactToastify.css';
function Signup({ setToken }) {
    function isPasswordValid(password) {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
    function validatedEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }
    const navigate = useNavigate();
    const [signup, setSignup] = useState(
        {
            fullName: "",
            email: "",
            password: ""
        });
    console.log(signup, "dshkj")
    const handleRegister = async (e) => {
        e.preventDefault();
        const req = {
            fullName: signup?.fullName,
            email: signup?.email,
            password: signup?.password
        }


        if ((isPasswordValid(signup?.password) && validatedEmail(signup?.email) && signup?.fullName) == false) {
            toast.warning("Please fill details and password have one special char and one number");
            setSignup({
                fullName: "",
                email: "",
                password: ""
            });
        } else {
            const data = await asyncPostCall("/users/register",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req)
                });
            if (data && typeof data == "string") {
                localStorage.setItem("token", data);

                setSignup({
                    fullName: "",
                    email: "",
                    password: ""
                });
                toast.success("Registraion succefully")
                setToken(data)
                navigate("/upload-img");

            } else {
                setSignup({
                    ...signup,
                    email: "",
                    password: ""
                });
                toast.error("Invalid  data eamil && password")
                return;
            }
        }
    }
    const NaviGateToLoginage = () => {
        navigate("/");
    }
    const handleSignOnchange = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value,
        });

    }

    return (

        <div className="container">

            <div className="title">Registration</div>
            <div >
                <form className="content" onSubmit={(e) => handleRegister(e)}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name :</span>
                            <input className="text-type-box" type="text" value={signup?.fullName} name='fullName' onChange={(e) => handleSignOnchange(e)} placeholder="Enter your name" />
                        </div>
                        <div className="input-box">
                            <span className="details">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;:</span>
                            <input className="text-type-box" type="text" value={signup?.email} name='email' placeholder="Enter your email" onChange={(e) => handleSignOnchange(e)} />
                        </div>

                        <div className="input-box">
                            <span className="details">Password :</span>
                            <input className="text-type-box" name='password' value={signup?.password} type="password" onChange={(e) => handleSignOnchange(e)} placeholder="Enter your password" />
                        </div>
                    </div>

                    <div >
                        <input className="button" type="submit" value="Register" />
                    </div>
                </form>
            </div>
            <div className='last-content'><span>You  have Account please press the </span>
                <span className='last-content-span' onClick={NaviGateToLoginage}> SignIn ?</span></div>
        </div>
    )
}

export default Signup;