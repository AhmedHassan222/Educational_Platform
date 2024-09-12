import React, { useState } from 'react';
import "../Styles/index.css"
import logo from "../../src/Assets/Images/logo.png"
import { Link } from 'react-router-dom';
import style from "../../src/Styles/Auth.module.css"
import axios from 'axios';
import Joi from 'joi';
export default function ResetPassword() {
    const [formData, setFormData] = useState({ email: '' });
    const [resetPassUrl, setresetPassUrl] = useState("");
    const [newPasswordForm, setNewPasswordForm] = useState({ newPassword: '' });
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState([])
    const [error2, setError2] = useState([])
    const [appear, setAppear] = useState(true)
    const [inputType, setInputType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setInputType(inputType === 'password' ? 'text' : 'password');
    };
    // form one functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //function zero 
    const handleChange = (e) => {
        const _formData = { ...formData };
        _formData[e.target.name] = e.target.value;
        setFormData(_formData);
    };
    //function one
    const resetPasswordForm = (e) => {
        e.preventDefault();
        const validate = validationForm();
        console.log(validate)
        validate.error ? setError(validate.error.details) : sendApi();
        // console.log(validate)
    };
    //function two
    const validationForm = () => {
        let schema = Joi.object({ email: Joi.string().email({ tlds: { allow: ["com", "net", "org"] } }) });
        return schema.validate(formData, { abortEarly: false });
    };
    //function three
    async function sendApi() {
        setIsloading(true)
        await axios.post(`https://ahmed-shaltout-platform.up.railway.app/auth/forget`, formData)
            .then((response) => {
                console.log(response)
                if (response.data.message === "Please check your email") {
                    setAppear(false)
                    console.log(response.data.restPasswordURL)
                    setresetPassUrl(response.data.restPasswordURL);
                }
            }).catch((error) => console.log(error))
        setIsloading(false)
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // form two functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //function zero 
    const handleChangeNewPassword = (e) => {
        const _newPasswordForm = { ...newPasswordForm };
        _newPasswordForm[e.target.name] = e.target.value;
        setNewPasswordForm(_newPasswordForm);
    };
    //function one
    const sendApiForNewPassword = (e) => {
        setIsloading(true)
        e.preventDefault();
        console.log(resetPassUrl)
        const validate = validationForm2();
        console.log(validate)
        // validate?.error ? setError2(validate.error.details) : sendApi2()
        // setIsloading(false)
    };
    //function two
    const validationForm2 = () => {
        let schema = Joi.object({ newPassword: Joi.string().regex(/^[a-zA-Z0-9]{4,}$/) });
        return schema.validate(newPasswordForm, { abortEarly: false });
    };
    //function three
    async function sendApi2() {
        try {
         let {data} =   await axios.post(`${resetPassUrl}`, newPasswordForm)
         console.log(data)
        } catch (error) {
            console.log(error)
        }
      
    }
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>






    return (
        <div className="container d-flex justify-content-center py-5">
            <div className="rounded-4 border-1 widthCustom text-center ">
                <Link to={'/'}>
                    <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
                </Link>
                {appear ? <form onSubmit={resetPasswordForm}>
                    <div className=" mb-4">
                        <input placeholder="البريد الالكتروني" type="email" className="w-100 p-2" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "email" ? <div key={index}>
                                {err.type === "string.email" ? <p className="small fw-medium py-2 text-end text-danger"> البريد الإلكتروني غير صحيح</p> : ""}
                                {!formData.email ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <button type="submit" className={`w-100 my-4 p-2 border-0 rounded-2 ${style.btnOrange} w-100`}> {isLoading ? <i className='fa fa-spin fa-spinner'></i> : "ارسل الايميل "}  </button>
                </form> : <form onSubmit={sendApiForNewPassword}>
                    <div className=" mb-4">
                        <div className="position-relative">
                            {inputType !== "password" ?
                                <i onClick={togglePasswordVisibility} className={`fa-solid fa-eye position-absolute  px-4  top-50 translate-middle ${style.eyePostion}`}></i> :
                                <i onClick={togglePasswordVisibility} className={`fa-solid fa-eye-slash position-absolute  px-4  top-50 translate-middle ${style.eyePostion}`}></i>
                            }
                            <input placeholder=" ادخل كلمة المرور الجديدة" type={inputType} className="w-100 p-2" id="newPassword" name="newPassword" value={newPasswordForm.newPassword} onChange={handleChangeNewPassword} />

                        </div>
                        {error2?.map((err, index) =>
                            err.context.label === "email" ? <div key={index}>
                                {err.type === "string.pattern.base" ? <p className="small fw-medium py-2 text-end text-danger">    يجب ان تحتوي كلمة  المرور علي 8 احروف او ارقام</p> : ""}
                                {!newPasswordForm.newPassword ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <button type="submit" className={`w-100 my-4 p-2 border-0 rounded-2 ${style.btnOrange} w-100`}> {isLoading ? <i className='fa fa-spin fa-spinner'></i> : "تحديث كلمة المرور"}</button>
                </form>}


                <Link to={'/login'} className={`mt-5 nav-link d-flex fitContent rounded-2 mx-auto px-4 bg-light justify-content-center  align-items-center ${style.goBackButton} py-0`}>
                    <span className='  nav-link  fs-6 m-3'>الرجوع للخلف</span>
                    <i className="fa-solid fa-arrow-left fs-6"></i>
                </Link>
            </div>

        </div>
    );
};

