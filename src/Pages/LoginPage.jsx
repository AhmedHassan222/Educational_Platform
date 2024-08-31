import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/index.css"
import style from "../../src/Styles/Auth.module.css"
import logo from "../../src/Assets/Images/logo.png"
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
        <div className="d-flex  justify-content-center  container py-5">
            <div className="rounded-4  border-1  widthCustom text-center">
                <Link to={'/'}>
                    <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            placeholder='ادخل البريد الالكتروني'
                            type="email"
                            className="w-100 p-2"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder='ادخل  كلمة المرور'
                            type="password"
                            className="w-100 p-2"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <div className="form-check mb-3 ">
                            <input
                                className=" border"
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label className="form-check-label text-muted me-1" htmlFor="rememberMe">
                                تذكرني
                            </label>
                        </div>
                        <Link className='nav-link text-muted' to={'/reset-password'}>نسيت كلمة المرور؟</Link>
                    </div>
                    <Link to={"/"}>
                        <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} w-100`}>تسجيل الدخول</button>
                    </Link>
                </form>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                    <p className="my-2 fs-6 me-1 ms-1">
                        ليس لديك حساب؟                    </p>
                    <Link className={`nav-link ${style.textOrange} `} to={'/register'}>حساب جديد</Link>

                </div>
            </div>
        </div>
    );
};

