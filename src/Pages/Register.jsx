import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../src/Styles/Auth.module.css";
import logo from "../../src/Assets/Images/logo.png";
import "../Styles/index.css";
import axios from "axios";
import Joi from "joi";
export default function Register() {
    //Variables here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "", repassword: "", gender: "", grade: "", stage: "", phoneNumber: "", parentsPhoneNumber: "" });
    const [error, setError] = useState([]);
    const [serverError, setServerError] = useState("");
    const [Isloading, setIsloading] = useState(false);
    // Function here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
    //function one >>
    const handleChange = (e) => {
        const _formData = { ...formData };
        _formData[e.target.name] = e.target.value;
        setFormData(_formData);
    };
    // function two >>
    const submitRegisterForm = (e) => {
        e.preventDefault();
        const validate = validationForm();
        validate.error ? setError(validate.error.details) : sendApi();
        setIsloading(false);
        sendApi();
    };
    // function three >>
    const validationForm = () => {
        let schema = Joi.object({
            fullName: Joi.string().min(3).max(100).required(),
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net", "org"] } })
                .required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/),
            repassword: Joi.valid(Joi.ref("password")).required(),
            gender: Joi.string().required(),
            grade: Joi.string().required(),
            stage: Joi.string().required(),
            phoneNumber: Joi.string().regex(/^\+20[0-9]{10}$/).required(),
            parentsPhoneNumber: Joi.string().regex(/^\+20[0-9]{10}$/).required(),
        });
        return schema.validate(formData, { abortEarly: false });
    };
    // function four >>
    async function sendApi() {
        setIsloading(true)
        await axios.post(`https://ahmed-shaltout-platform.up.railway.app/auth/signup`, formData)
            .then((response) => {
                if (response.data.message === "Sign up success please confirm email")
                    navigate('/login');
            }).catch((error) => {
                setServerError(error.response?.data?.message);
            });
        setIsloading(false)
    }
    return (
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <Link to={"/"}>
                    <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
                </Link>
                <form onSubmit={submitRegisterForm}>
                    <div className=" mb-4">
                        <input placeholder=" الاسم بالكامل" type="text" className="w-100 p-2" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "fullName" ? <div key={index}>
                                {err.type === "string.min" ? <p className="small fw-medium py-2 text-end text-danger">يجب أن لا يقل عدد الحروف عن 3</p> : ""}
                                {err.type === "string.max" ? <p className="small fw-medium py-2 text-end text-danger">يجب الا يزيد عدد الحروف عن  100 حرف</p> : ""}
                                {!formData.fullName ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <input placeholder="البريد الالكتروني" type="email" className="w-100 p-2" id="email" name="email" value={formData.email} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "email" ? <div key={index}>
                                {err.type === "string.email" ? <p className="small fw-medium py-2 text-end text-danger"> البريد الإلكتروني غير صحيح</p> : ""}
                                {!formData.email ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <input placeholder="ادخل كلمة المرور" type="password" className="w-100 p-2" id="password" name="password" value={formData.password} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "password" ? <div key={index}>
                                {err.type === "string.pattern.base" ? <p className="small fw-medium py-2 text-end text-danger">    يجب ان تحتوي كلمة  المرور علي 8 احروف او ارقام</p> : ""}
                                {!formData.password ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <input placeholder="تأكيد كلمة المرور " type="password" className="w-100 p-2" id="repassword" name="repassword" value={formData.repassword} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "password" ? <div key={index}>
                                {formData.password !== formData.repassword ? <p className="small fw-medium py-2 text-end text-danger">    كلمتا المرور غير متطابقتين</p> : ""}
                                {!formData.repassword ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <select className="w-100 p-2 text-muted" id="gender" name="gender" value={formData.gender} onChange={handleChange} >
                            <option value="">النوع</option>
                            <option value="male">ذكر</option>
                            <option value="female">انثي</option>
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "gender" ? <div key={index}>
                                {!formData.gender ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <select className="w-100 p-2 text-muted" id="grade" name="grade" value={formData.grade} onChange={handleChange} >
                            <option value="">الصف </option>
                            <option value="First">الصف الاول </option>
                            <option value="Second">الصف الثاني </option>
                            <option value="Third">الصف الثالث </option>
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "grade" ? <div key={index}>
                                {!formData.grade ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <select className="w-100 p-2 text-muted" id="stage" name="stage" value={formData.stage} onChange={handleChange}  >
                            <option value="">المرحلة </option>
                            <option value="Primary">الابتدائية</option>
                            <option value="Preparatory">الاعدادية </option>
                            <option value="secondary">الثانوية </option>
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "stage" ? <div key={index}>
                                {!formData.stage ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <input placeholder="رقم الهاتف" type="text" className="w-100 p-2" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "phoneNumber" ? <div key={index}>
                                {/* {!formData.phoneNumber.startsWith("+20") && formData.phoneNumber ? <p className="small fw-medium py-2 text-end text-danger"> يجب أن تبدأ +20 ثم رقم الهاتف</p> : ""} */}
                                {!formData.phoneNumber ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <div className=" mb-4">
                        <input placeholder="رقم هاتف ولي الامر" type="text" className="w-100 p-2" id="parentsPhoneNumber" name="parentsPhoneNumber" value={formData.parentsPhoneNumber} onChange={handleChange} />
                        {error?.map((err, index) =>
                            err.context.label === "parentsPhoneNumber" ? <div key={index}>
                                {/* {!formData.parentsPhoneNumber.startsWith("+20") && formData.parentsPhoneNumber ? <p className="small fw-medium py-2 text-end text-danger"> يجب أن تبدأ +20 ثم رقم الهاتف</p> : ""} */}
                                {!formData.parentsPhoneNumber ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>{Isloading?<i className="fa-spin fa fa-spinner"></i> : "انشاء حساب" }</button>
                    {serverError ? <p className="text-danger py-1 text-center small">لديك مشكلة في انشاء الحساب</p>:''}
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