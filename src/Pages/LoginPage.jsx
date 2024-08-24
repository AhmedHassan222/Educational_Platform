import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/index.css"
export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation and submission logic here
        console.log(formData);
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center container py-5">
            <div className="rounded-4  border-1  widthCustom">
                <h2 className="text-center mb-5">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            placeholder='Email'
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder='Password'
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label className="form-check-label text-muted" htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                        <Link className='nav-link text-muted' to={'/reset-password'}>forget password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="d-flex align-items-center mt-3">
                    <p className="my-2 fs-6 me-1">
                        Don't Have An Account?
                    </p>
                    <Link className='text-muted nav-link' to={'/register'}>New Account</Link>

                </div>
            </div>
        </div>
    );
};

