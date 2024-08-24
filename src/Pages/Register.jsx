import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className=" rounded-4  border-1 widthCustom mx-auto">
                <h2 className="text-center mb-5">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className=" mb-3">
                        <input
                            placeholder="Full Name"
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-3">
                        <input
                            placeholder="Email"
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className=" mb-3">
                        <input
                            placeholder="Password"
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-3">
                        <input
                            placeholder="convert password"
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className=" mb-3">
                        <select
                            className="form-select"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className=" mb-3">
                        <select
                            className="form-select"
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="first">first</option>
                            <option value="second">second</option>
                            <option value="thered">thered</option>
                        </select>
                    </div>
                    <div className=" mb-3">
                        <input
                            placeholder="Phone Number"
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className=" mb-3">
                        <input
                            placeholder="Parent's Phone Number"
                            type="tel"
                            className="form-control"
                            id="parentsPhoneNumber"
                            name="parentsPhoneNumber"
                            value={formData.parentsPhoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary  w-100">Register</button>
                </form>
                <div className="d-flex align-items-center mt-3">
                    <p className="my-2 fs-6 me-1">
                        Already have an account?
                    </p>
                    <Link className='text-muted nav-link' to={'/login'}>Login</Link>

                </div>

            </div>
        </div>
    );
};

