import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../src/Styles/Auth.module.css";
import logo from "../../src/Assets/Images/logo.png";
import "../Styles/index.css";
import axios from "axios";
import Joi from "joi";
import { jsxs } from "react/jsx-runtime";

export default function Register() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repassword: "",
    gender: "",
    grade: "",
    stage: "",
    phoneNumber: "",
    FatherPhoneNumber: "",
  });

  const [error, setError] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const handleChange = (e) => {
    let myFormData = { ...formData };
    myFormData[e.target.name] = e.target.value;
    setFormData(myFormData);
  };
  async function sendApi() {
    let { data } = await axios.post(
      `https://ahmed-shaltout-platform.up.railway.app/auth/signup`,
      formData
    );
    // console.log(data)
    if (data.message == "Sign up success please confirm email") {
      setIsloading(false);
      localStorage.setItem("user",JSON.stringify(formData))
      navigate("/login");
    } else {
      setError(data.message);
      setIsloading(false);
    }
  }
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
      parentsPhoneNumber:Joi.string().regex(/^\+20[0-9]{10}$/).required(),
    });
    return schema.validate(formData, { abortEarly: false });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    let validate = validationForm();
    console.log(validate)
    // if (validate.error) {
    //   setIsloading(false);
    //   setError(validate.error.details);
    // } else {
    //   sendApi();
    //   setIsloading(false);
    // }
  };
  return (
    <div className="container py-5">
      <div className="text-center rounded-4  border-1 widthCustom mx-auto">
        <Link to={"/"}>
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
            />
            {error.map((err, index) => {
              if (err.context.label == "fullName") {
                if(err.type=="string.min"){
                    return <p className="small p-2 text-danger">يجب أن لا يقل عدد الحروف عن 3</p>
                }else if(err.type=="string.max"){
                    return <p className="small p-2 text-danger">يجب الا يزيد عدد الحروف عن  100 حرف</p>
                }else{
                    return <p className="small p-2 text-danger">لا يمكن ارسال هذا الحقل  فارغا</p>

                }
              } 
            })}
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
            {error.map((err, index) => {
              if (err.context.label == "email") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {err.message}
                  </p>
                );
              } else {
                return "";
              }
            })}
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
            {error.map((err, index) => {
              if (err.context.label == "password") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    password invalid
                  </p>
                );
              } else {
                return "";
              }
            })}
          </div>
          <div className=" mb-4">
            <input
              placeholder="تأكيد كلمة المرور "
              type="password"
              className="w-100 p-2"
              id="repassword"
              name="repassword"
              value={formData.repassword}
              onChange={handleChange}
              required
            />
            {error.map((err, index) => {
              if (err.context.label == "repassword") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    password invalid
                  </p>
                );
              } else {
                return "";
              }
            })}
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
            {error.map((err, index) => {
              if (err.context.label == "gender") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {" "}
                    {err.message}
                  </p>
                );
              } else {
                return "";
              }
            })}
          </div>
          <div className=" mb-4">
            <select
              className="w-100 p-2 text-muted"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="">الصف </option>
              <option value="First">الصف الاول </option>
              <option value="Second">الصف الثاني </option>
              <option value="Third">الصف الثالث </option>
            </select>
            {error.map((err, index) => {
              if (err.context.label == "class") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {" "}
                    {err.message}
                  </p>
                );
              } else {
                return "";
              }
            })}
          </div>
          <div className=" mb-4">
            <select
              className="w-100 p-2 text-muted"
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="">المرحلة </option>
              <option value="Primary">الابتدائية</option>
              <option value="Preparatory">الاعدادية </option>
              <option value="secondary">الثانوية </option>
            </select>
            {error.map((err, index) => {
              if (err.context.label == "stage") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {" "}
                    {err.message}
                  </p>
                );
              } else {
                return "";
              }
            })}
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
              
            />
            {error.map((err, index) => {
              if (err.context.label == "phoneNumber") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {" "}
                    {err.message}
                  </p>
                );
              } else {
                return "";
              }
            })}
          </div>
          <div className=" mb-4">
            <input
              placeholder="رقم هاتف ولي الامر"
              type="text"
              className="w-100 p-2"
              id="FatherPhoneNumber"
              name="FatherPhoneNumber"
              value={formData.FatherPhoneNumber}
              onChange={handleChange}
              
            />
            {error.map((err, index) => {
              if (err.context.label == "FatherPhoneNumber") {
                return (
                  <p key={index} className="text-danger my-2 text-end">
                    {" "}
                    {err.message}
                  </p>
                );
              } 
            })}
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

