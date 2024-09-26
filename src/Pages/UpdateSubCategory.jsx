import axios from "axios";
import Joi from "joi";
import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UpdatedSubCategory() {
  const { name, id } = useParams()
  let navagite = useNavigate()
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [Isloading, setIsloading] = useState(false);
  const [error, setError] = useState([]);
  const [updateSubCategory, setupdateSubCategory] = useState({ name: "" });
  // FUNCTION UPDATE SUBCATEGORY
  async function updateItem() {
    setIsloading(true)
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details);
      setIsloading(false)
    }
    try {
      await axios
        .put(`${baseURL}/subcategory/update?subCategoryId=${id}`, updateSubCategory, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setIsloading(false)
          if (res.status === 200) {
            navagite('/admin/allSubCategories')
          }
          if (res.data.message === "Refresh token") {
            toast.error("انتهت صلاحية الجلسة, حاول مرة اخري", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            Cookies.set('token', res?.data?.refreshToken, { expires: 7 });
          }
        });
    } catch (error) {
      setIsloading(false)
      if(error.response.data.Error ==='wrong  token'){
        Cookies.remove('token');
        navagite('/login')
    }else{
        toast.error(" هناك مشكلة في التحديث", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
    }
  }
  // FUNCTION HANDLE OBJECT >>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setupdateSubCategory({ name: selectedValue });
  };
  // FUNCTION VALIDATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const validationForm = () => {
    let schema = Joi.object({
      name: Joi.string().required(),
    });
    return schema.validate(updateSubCategory, { abortEarly: false });
  };
  // FUNCTION HANDLE OBJECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details)
    } else {
      updateItem()
    }
  };
  return <>
    <div className="container py-5">
    <ToastContainer />
      <div className="text-center rounded-4  border-1 widthCustom mx-auto">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className=" mb-4">
            <select className="w-100 p-2 text-muted" id="name" name="name" value={updateSubCategory.name?updateSubCategory.name:name} onChange={handleChange}  >
              <option value="">الصف الدراسي </option>
              <option value="first">الصف الاول</option>
              <option value="second">الصف الثاني </option>
              <option value="third">الصف الثالث </option>
              <option value="fourth">الصف الرابع </option>
              <option value="fifth">الصف الخامس </option>
              <option value="sixth">الصف السادس </option>
            </select>
            {error?.map((err, index) =>
              err.context.label === "name" ? <div key={index}>
                {!updateSubCategory.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
              </div> : ""
            )}
          </div>
          <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa fa-spin fa-spinner"></i> : "حفظ"}</button>
        </form>
      </div>
    </div>
  </>;
}
