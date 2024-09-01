import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/index.css";
import style from "../../src/Styles/Auth.module.css";
import logo from "../../src/Assets/Images/logo.png";
import axios from "axios";
import Joi from "joi";
export default function LoginPage() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      `https://ahmed-shaltout-platform.up.railway.app/auth/signin`,
      formData
    );
    // console.log(data)
    if (data.message == "login success ") {
      setIsloading(false);
      navigate("/cources");
    } else {
      setError(data.message);
      setIsloading(false);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    let validate = validationForm();
    if (validate.error) {
      setIsloading(false);
      setError(validate.error.details);
    } else {
      sendApi();
      setIsloading(false);
    }
  };
  const validationForm = () => {
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/)
    });
    return schema.validate(formData, { abortEarly: false });
  };
  return (
    <div className="d-flex  justify-content-center  container py-5">
      <div className="rounded-4  border-1  widthCustom text-center">
        <Link to={"/"}>
          <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="ادخل البريد الالكتروني"
              type="email"
              className="w-100 p-2"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
                 {error.map((err,index)=>{
                if(err.context.label =="email"){
                  return   <p key={index} className="text-danger my-2 text-end">{err.message}</p>
                }else{
                    return ""
                }
            })}

          </div>
          <div className="mb-3">
            <input
              placeholder="ادخل  كلمة المرور"
              type="password"
              className="w-100 p-2"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
             {error.map((err,index)=>{
                if(err.context.label =="password"){
                  return   <p key={index} className="text-danger my-2 text-end">password invalid</p>
                }else{
                    return ""
                }
            })}

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
              <label
                className="form-check-label text-muted me-1"
                htmlFor="rememberMe"
              >
                تذكرني
              </label>
            </div>
            <Link className="nav-link text-muted" to={"/reset-password"}>
              نسيت كلمة المرور؟
            </Link>
          </div>
          <Link to={"/cources"}>
            <button
              type="submit"
              className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} w-100`}
            >
            {Isloading == true ? <i className="fa-solid fa-spinner fa-spin"></i>:"تسجيل الدخول"}
            </button>
          </Link>
        </form>
        <div className="d-flex align-items-center mt-3 justify-content-center">
          <p className="my-2 fs-6 me-1 ms-1">ليس لديك حساب؟ </p>
          <Link className={`nav-link ${style.textOrange} `} to={"/register"}>
            حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
