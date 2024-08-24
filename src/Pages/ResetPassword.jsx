import React, { useState } from 'react';
import "../Styles/index.css"
import { Link } from 'react-router-dom';
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
            <div className="rounded-4 border-1 widthCustom ">
                <h2 className="text-center mb-4">Forgot Password</h2>
                {submitted ? (
                    <div className="alert alert-success" role="alert">
                        A password reset link has been sent to your email address.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                placeholder='Email'
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                )}
                <Link to={'/login'} className="mt-5 nav-link d-flex fitContent py-2 mx-auto px-4 bg-light justify-content-center  align-items-center ">
                    <span className='  nav-link  fs-6 me-3'>Go Back</span>
                    <i className="fa-solid fa-arrow-right fs-6"></i>
                </Link>
            </div>

        </div>
    );
};

