import React, { useState } from 'react';
import "../Styles/index.css"
import logo from "../../src/Assets/Images/logo.png"
import { Link } from 'react-router-dom';
import style from "../../src/Styles/Auth.module.css"
export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate password reset request
        setSubmitted(true);
        console.log("Password reset link sent to:", email);
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="rounded-4 border-1 widthCustom text-center ">
                <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
                {submitted ? (
                    <div className="alert alert-success" role="alert">
                        A password reset link has been sent to your email address.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                placeholder='ادخل البريد الالكتروني  '
                                type="email"
                                className="w-100 p-2 my-4"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} w-100`}>ادخل الرمز </button>
                    </form>
                )}
                <Link to={'/login'} className={`mt-5 nav-link d-flex fitContent rounded-2 mx-auto px-4 bg-light justify-content-center  align-items-center ${style.goBackButton} py-0`}>
                    <span className='  nav-link  fs-6 m-3'>الرجوع للخلف</span>
                    <i className="fa-solid fa-arrow-left fs-6"></i>
                </Link>
            </div>

        </div>
    );
};

