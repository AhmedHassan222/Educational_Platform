import avatar from "../Assets/Images/default-avatar.png";
import Styles from "../Styles/Profile.module.css";
import style from "../../src/Styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import Joi from "joi";
export default function Profile() {
  let navigate = useNavigate();
  const [userDetails, setuserDetails] = useState([]);
  const [errorForm, seterrorForm] = useState("");
  const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي", };
  const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };

  function logOut() {
    Cookies.remove('token');
    navigate('/login')

  }
  async function getAllUserById(id) {
    try {
      const { data } = await axios.get(`https://ahmed-shaltout-platform.up.railway.app/auth/teachers?role=User&_id=${id}`);
      if (Array.isArray(data)) {
        setuserDetails(data);

      } else {
        setuserDetails(data.data);
      }
    } catch (error) {
      seterrorForm(error.message)
    }

  }
  useEffect(() => {
    let user;
    if (Cookies.get('token')) {
      user = jwtDecode(Cookies.get('token'))
      getAllUserById(user._id)
    }
  }, [userDetails?.length])
  //  add image profile >>>>>>>>>>>>>>>>>>>>
  //variabel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [isSubmit, setIsSubmit] = useState(false);
  const formData = new FormData();
  const [image, setImage] = useState(null);
  const [Isloading, setIsloading] = useState(false);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const validExtensions = ["image/png", "image/jpeg", "image/gif"];
  const [addImageForm, setAddImageForm] = useState(false)
  const [updaetForm, setUpdateForm] = useState(false)
  // function
  // HANDLE SUBMIT FORM >>
  const handleSubmit = (e) => {
    setIsSubmit(true);
    e.preventDefault();
    addImage();
  };
  // FUNCTION HANDLE IMAGE >>
  const handleImageChange = (e) => {
    const file = Array.from(e.target.files)[0];
    setImage(file);
  };
  // FUNCTION ADD IMAGE
  async function addImage() {
    setIsloading(true);
    formData.append("image", image);
    try {
      await axios.post(`${baseURL}/auth/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "token": `online__${Cookies.get('token')}`
        }
      }).then((res) => {
        setIsloading(false);
        setAddImageForm(false)
        console.log(res)
      });
    } catch (error) {
      console.log(error)
      setIsloading(false);
      seterrorForm(error);
    }
  }

  // ------------------------------------------------------------------------
  //  ***********************************************************************
  // update form 
  // variable >>>>>>>>>>>
  const [updateObject, setUpdateObject] = useState({ fullName: "", email: "", grade: "", stage: "", phoneNumber: "" });
  const [error, setError] = useState([]);
  let stageArabic = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
  let gradeArabic = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
  const [serverError, setServerError] = useState("");
  // functions 
  // Function here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
  //function one >>
  const handleChange = (e) => {
    const _updateObject = { ...updateObject };
    _updateObject[e.target.name] = e.target.value;
    setUpdateObject(_updateObject);
  };
  // function two >>
  const update = (e) => {
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
      grade: Joi.string().required(),
      stage: Joi.string().required(),
      phoneNumber: Joi.string().regex(/^\01(0125)[0-9]{8}$/).required(),
    });
    return schema.validate(formData, { abortEarly: false });
  };
  // function four >>
  async function sendApi() {
    setIsloading(true)
    formData.phoneNumber = `+2${formData.phoneNumber}`
    await axios.post(`https://ahmed-shaltout-platform.up.railway.app`, updateObject)
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        setServerError(error.response?.data?.message);
        console.log(error)
      });
    setIsloading(false)
  }


  return (
    <>
      {/* add imaeg profile */}
      {addImageForm ? <div className="container py-5 px-3">
        <div className="text-center rounded-4  border-1 widthCustom mx-auto ">
          <h3 className="text-end mb-4">اضافة صورة</h3>
          <form encType='multibart/form-data' onSubmit={handleSubmit}>
            <div className=" mb-4">
              <input placeholder=" اضف صورة " type="file" className="w-100 p-2 small" name="image" onChange={handleImageChange} />
              {isSubmit ? <>
                {!image ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                {image ? !validExtensions.includes(image?.type) ? <p className="small fw-medium  py-2 text-end text-danger">هذا الامتداد غير صحيح</p> : "" : ""}
              </> : ""}
            </div>
            <button type="submit" className={`w-100 my-4 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>{Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
            {errorForm ? <p className="text-danger py-1 text-center small">لديك مشكلة في رفع الصورة  </p> : ''}
          </form>
        </div >
      </div > : ''}
      {updaetForm ? <div className="container py-5 px-3">
        <div className="text-center rounded-4  border-1 widthCustom mx-auto ">
          <h3 className="text-end mb-4"> تعديل الملف الشخصي</h3>
          <form onSubmit={update}>
            <div className=" mb-4">
              <label className="w-100 small text-end" htmlFor="fullName">{userDetails[0]?.fullName}</label>
              <input placeholder="عدل الاسم " type="text" className="w-100 p-2 small" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
              {error?.map((err, index) =>
                err.context.label === "fullName" ? <div key={index}>
                  {err.type === "string.min" ? <p className="small fw-medium py-2 text-end text-danger">يجب أن لا يقل عدد الحروف عن 3</p> : ""}
                  {err.type === "string.max" ? <p className="small fw-medium py-2 text-end text-danger">يجب الا يزيد عدد الحروف عن  100 حرف</p> : ""}
                  {!formData.fullName ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                </div> : ""
              )}
            </div>
            <div className=" mb-4">
              <label className="w-100 small text-end" htmlFor="email">{userDetails[0]?.email}</label>
              <input placeholder="عدل الايميل " type="email" className="w-100 p-2 small" id="email" name="email" value={formData.email} onChange={handleChange} />
              {error?.map((err, index) =>
                err.context.label === "email" ? <div key={index}>
                  {err.type === "string.email" ? <p className="small fw-medium py-2 text-end text-danger"> البريد الإلكتروني غير صحيح</p> : ""}
                  {!formData.email ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                </div> : ""
              )}
            </div>
            <div className=" mb-4">
              <label className="w-100 small text-end" htmlFor="grade">{stage[userDetails[0]?.grade]}</label>
              <select className="w-100 p-2 text-muted small" id="grade" name="grade" value={formData.grade} onChange={handleChange} >
                <option value="">الصف </option>
                <option value="first">الصف الاول </option>
                <option value="second">الصف الثاني </option>
                <option value="third">الصف الثالث </option>
              </select>
              {error?.map((err, index) =>
                err.context.label === "grade" ? <div key={index}>
                  {!formData.grade ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                </div> : ""
              )}
            </div>
            <div className=" mb-4">
              <label className="w-100 small text-end" htmlFor="stage">{grade[userDetails[0]?.stage]}</label>
              <select className="w-100 p-2 text-muted small" id="stage" name="stage" value={formData.stage} onChange={handleChange}  >
                <option value="">المرحلة </option>
                <option value="primary">الابتدائية</option>
                <option value="preparatory">الاعدادية </option>
                <option value="secondary">الثانوية </option>
              </select>
              {error?.map((err, index) =>
                err.context.label === "stage" ? <div key={index}>
                  {!formData.stage ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                </div> : ""
              )}
            </div>
            <div className=" mb-4">
              <label className="w-100 small text-end" htmlFor="phoneNumber">{userDetails[0]?.phoneNumber}</label>
              <input placeholder="رقم الهاتف" type="text" className="w-100 p-2 small" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              {error?.map((err, index) =>
                err.context.label === "phoneNumber" ? <div key={index}>
                  {/* {!formData.phoneNumber.startsWith("+20") && formData.phoneNumber ? <p className="small fw-medium py-2 text-end text-danger"> يجب أن تبدأ +20 ثم رقم الهاتف</p> : ""} */}
                  {!formData.phoneNumber ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                </div> : ""
              )}
            </div>
            <button type="submit" className={`w-100 my-4 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>{Isloading ? <i className="fa-spin fa fa-spinner"></i> : "انشاء حساب"}</button>
            {serverError ? <p className="text-danger py-1 text-center small">لديك مشكلة في انشاء الحساب</p> : ''}
          </form>
        </div >
      </div > : ''
      }
      {/* ----------------- */}
      {
        !addImageForm && !updaetForm ? <div className="container py-5">
          <div className="d-flex align-items-center justify-content-between  ">
            <h3 className="h4" >الملف الشخصي </h3>
            <div className="d-flex align-items-center w-50 justify-content-end  text-start">
              <img src={avatar} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className={`${Styles.defaultImg}  rounded-circle mx-2`} alt="default image " />
              <ul className="dropdown-menu p-1 small text-end" aria-labelledby="dropdownMenuButton1" >
                <li className="p-2">
                  <span onClick={() => setUpdateForm(true)} className="w-100">تعديل الملف الشخصي </span>
                </li>
                <li className="p-2">
                  <div onClick={logOut} className="dropdown-item d-flex justify-content-between align-items-center" >
                    <span>تسجيل الخروج </span>
                    <i className="fa-solid fa-right-from-bracket fs-6 mx-2 "></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {Array.isArray(userDetails) && userDetails.length > 0 ?
            <div className="p-3">
              <div className="row border my-4 border-1 p-2 border-muted  align-items-center">
                <div className="col-2 col-md-1 position-relative">
                  <img onClick={() => setAddImageForm(true)} src={avatar} className={` w-100 `} alt="default image" />
                  {userDetails[0]?.photo?.secure_url ? <i className="fa-solid fa-pen position-absolute p-2 rounded-circle bg-white top-50 start-50 small"></i> : ""}
                </div>
                <div className="col-10 col-md-11">
                  <div >
                    <h3 className="h4">  {userDetails[0].fullName}</h3>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted">
                <div className="d-flex">
                  <i className="fa-solid fa-user fs-5 ms-5"></i>
                  <div>
                    <p className="text-muted h5">اسم الطالب</p>
                    <p>{userDetails[0].fullName}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted">
                <div className="d-flex">
                  <i className="fa-solid fa-graduation-cap fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5"> الصف الدراسي</p>
                    <p>{stage[userDetails[0].grade]} {grade[userDetails[0].stage]}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted">
                <div className="d-flex">
                  <i className="fa-solid fa-envelope fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5">  البريد الإلكتروني  </p>
                    <p>{userDetails[0].email} </p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted">
                <div className="d-flex">
                  <i className="fa-solid fa-phone fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5">رقم الهاتف </p>
                    <p>{userDetails[0].phoneNumber.replace("+2", "")}</p>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="p-3">
              <div className="row border my-4 border-1 p-2 border-muted  align-items-center">
                <div className="col-2 col-md-1">
                  <img src={fakeImage} className={` w-100 `} alt="loading image" />
                </div>
                <div className="col-10 col-md-11">
                  <div className="text-card-top placeholder-glow">
                    <h3 className="h4 placeholder col-4">  </h3>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted text-card-top placeholder-glow">
                <div className="d-flex">
                  <i className="fa-solid fa-user fs-5 ms-5"></i>
                  <div>
                    <p className="text-muted h5">اسم الطالب</p>
                    <p className="placeholder col-12 "></p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted text-card-top placeholder-glow">
                <div className="d-flex">
                  <i className="fa-solid fa-graduation-cap fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5"> الصف الدراسي</p>
                    <p className="placeholder col-12 "></p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted text-card-top placeholder-glow">
                <div className="d-flex">
                  <i className="fa-solid fa-envelope fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5">  البريد الإلكتروني  </p>
                    <p className="placeholder col-12 "></p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-1 border border-muted text-card-top placeholder-glow">
                <div className="d-flex">
                  <i className="fa-solid fa-phone fs-5 ms-5"></i>
                  <div className="">
                    <p className="text-muted h5">رقم الهاتف </p>
                    <p className="placeholder col-12 "></p>
                  </div>
                </div>
              </div>
            </div>

          }
        </div> : ''
      }
      {errorForm.length > 0 ? <p className=" text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
    </>
  );
}
