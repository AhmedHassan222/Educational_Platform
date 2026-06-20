import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../src/Styles/Auth.module.css";
import logo from "../../src/Assets/Images/logo.png";
import "../Styles/index.css";
import axios from "axios";
import Joi from "joi";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { SharedDataContext } from "../Contexts/SharedDataContext";

export default function Register() {
  //Variables here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
  const { baseURL } = useContext(SharedDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repassword: "",
    gender: "",
    grade: "",
    stage: "",
    phoneNumber: "",
    parentsPhoneNumber: "",
  });
  const registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .email({
        tlds: { allow: ["com","org","net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,}$/)
      .required(),
    repassword: Joi.valid(Joi.ref("password")).required(),
    gender: Joi.string().required(),
    grade: Joi.string().required(),
    stage: Joi.string().required(),
    phoneNumber: Joi.string()
      .pattern(/^01[0125]\d{8}$/)
      .required(),
    parentsPhoneNumber: Joi.string()
      .pattern(/^01[0125]\d{8}$/)
      .required(),
  });
  const [error, setError] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  // Function here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
  //function one >>
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // function two >>
  const submitRegisterForm = (e) => {
    e.preventDefault();
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details);
      return;
    }
    setError([]);
    sendApi();
  };
  // function three >>
  const validationForm = () =>
    registerSchema.validate(formData, { abortEarly: false });
  // function four >>
  async function sendApi() {
    try {
      setIsloading(true);

      const payload = {
        ...formData,
        phoneNumber: `+2${formData.phoneNumber}`,
        parentsPhoneNumber: `+2${formData.parentsPhoneNumber}`,
      };

      const { data } = await axios.post(`${baseURL}/auth/signup`, payload);

      if (data.success) {
        toast.success("تم إنشاء الحساب بنجاح");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.message === "Validation Error") {
        toast.error("مشكلة في إنشاء الحساب، اتبع التعليمات");
      }
    } finally {
      setIsloading(false);
    }
  }
  // useeffect
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Register Page - Sky Online Acadimy</title>
      </Helmet>
      <ToastContainer />
      <div className="container py-5">
        <div className="text-center rounded-4  border-1 widthCustom mx-auto">
          <Link to={"/"}>
            <img src={logo} alt="sky academy logo" className="mb-2 w-25" />
          </Link>
          <form onSubmit={submitRegisterForm}>
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
              {error?.map((err, index) =>
                err.context.label === "fullName" ? (
                  <div key={index}>
                    {err.type === "string.min" ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        يجب أن لا يقل عدد الحروف عن 3
                      </p>
                    ) : (
                      ""
                    )}
                    {err.type === "string.max" ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        يجب الا يزيد عدد الحروف عن 100 حرف
                      </p>
                    ) : (
                      ""
                    )}
                    {!formData.fullName ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
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
              />
              {error?.map((err, index) =>
                err.context.label === "email" ? (
                  <div key={index}>
                    {err.type === "string.email" ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        {" "}
                        البريد الإلكتروني غير صحيح
                      </p>
                    ) : (
                      ""
                    )}
                    {!formData.email ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            <div className=" mb-4 ">
              <div className="position-relative">
                <i
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`fa-solid position-absolute  px-4  top-50 translate-middle ${style.eyePostion} ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="ادخل كلمة المرور"
                  className="w-100 p-2 "
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error?.map((err, index) =>
                err.context.label === "password" ? (
                  <div key={index}>
                    {err.type === "string.pattern.base" ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        {" "}
                        يجب أن تحتوي كلمة المرور على 8 أحرف أو أرقام على الأقل
                      </p>
                    ) : (
                      ""
                    )}
                    {!formData.password ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            <div className=" mb-4">
              <div className="position-relative">
                <i
                  onClick={() => setShowRePassword((prev) => !prev)}
                  className={`fa-solid position-absolute  px-4  top-50 translate-middle ${style.eyePostion} ${
                    showRePassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                />
                <input
                  type={showRePassword ? "text" : "password"}
                  name="repassword"
                  placeholder="تأكيد كلمة المرور "
                  className="w-100 p-2"
                  id="repassword"
                  value={formData.repassword}
                  onChange={handleChange}
                />
              </div>
              {error?.map((err, index) =>
                err.context.label === "repassword" ? (
                  <div key={index}>
                    {formData.password !== formData.repassword ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        {" "}
                        كلمتا المرور غير متطابقتين
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            <div className=" mb-4">
              <select
                className="w-100 p-2 text-muted"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">النوع</option>
                <option value="male">ذكر</option>
                <option value="female">انثي</option>
              </select>
              {error?.map((err, index) =>
                err.context.label === "gender" ? (
                  <div key={index}>
                    {!formData.gender ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            <div className=" mb-4">
              <select
                className="w-100 p-2 text-muted"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">الصف </option>
                <option value="first">الصف الاول </option>
                <option value="second">الصف الثاني </option>
                <option value="third">الصف الثالث </option>
              </select>
              {error?.map((err, index) =>
                err.context.label === "grade" ? (
                  <div key={index}>
                    {!formData.grade ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
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
                <option value="primary">الابتدائية</option>
                <option value="preparatory">الاعدادية </option>
                <option value="secondary">الثانوية </option>
              </select>
              {error?.map((err, index) =>
                err.context.label === "stage" ? (
                  <div key={index}>
                    {!formData.stage ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
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
              {error?.map((err, index) =>
                err.context.label === "phoneNumber" ? (
                  <div key={index}>
                    {!formData.phoneNumber ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
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
              />
              {error?.map((err, index) =>
                err.context.label === "parentsPhoneNumber" ? (
                  <div key={index}>
                    {!formData.parentsPhoneNumber ? (
                      <p className="small fw-medium py-2 text-end text-danger">
                        لا يمكن ارسال هذا الحقل فارغا
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            <button
              type="submit"
              className={`w-100 my-4 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}
            >
              {Isloading ? (
                <i className="fa-spin fa fa-spinner"></i>
              ) : (
                "انشاء حساب"
              )}
            </button>
          </form>
          <div className="d-flex align-items-center justify-content-center ">
            <p className="my-2 fs-6 ms-1">لديك حساب بالفعل؟</p>
            <Link className={` nav-link ${style.textOrange}`} to={"/login"}>
              سجل الدخول
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
