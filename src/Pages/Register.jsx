import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "../../src/Styles/Auth.module.css"
import logo from "../../src/Assets/Images/logo.png"
import "../Styles/index.css"
export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        class: '',
        phoneNumber: '',
        parentsPhoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation and submission logic here
        console.log(formData);
    };

    return (
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <Link to={'/'}>
                    <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className=" mb-4">
                        <input
                            placeholder=" الاسم بالكامل"
                            type="text"
                            className="w-100 p-2"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-4">
                        <input
                            placeholder="البريد الالكتروني"
                            type="email"
                            className="w-100 p-2"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className=" mb-4">
                        <input
                            placeholder="ادخل كلمة المرور"
                            type="password"
                            className="w-100 p-2"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-4">
                        <input
                            placeholder="تأكيد كلمة المرور "
                            type="password"
                            className="w-100 p-2"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className=" mb-4">
                        <select
                            className="w-100 p-2 text-muted"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">النوع</option>
                            <option value="male">ذكر</option>
                            <option value="female">انثي</option>
                        </select>
                    </div>
                    <div className=" mb-4">
                        <select
                            className="w-100 p-2 text-muted"
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            required
                        >
                            <option value="">الصف الدراسي</option>
                            <option value="first">الصف الاول الثانوي</option>
                            <option value="second">الصف الثاني الثانوي</option>
                            <option value="thered">الصف الثالث الثانوي</option>
                        </select>
                    </div>
                    <div className=" mb-4">
                        <input
                            placeholder="رقم الهاتف"
                            type="text"
                            className="w-100 p-2"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-4">
                        <input
                            placeholder="رقم هاتف ولي الامر"
                            type="text"
                            className="w-100 p-2"
                            id="parentsPhoneNumber"
                            name="parentsPhoneNumber"
                            value={formData.parentsPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>انشاء حساب</button>
                </form>
                <div className="d-flex align-items-center justify-content-center ">
                    <p className="my-2 fs-6 ms-1">
                        لديك حساب بالفعل؟
                    </p>
                    <Link className={` nav-link ${style.textOrange}`} to={'/login'}>سجل الدخول</Link>

                </div>

            </div>
        </div>
    );
};

