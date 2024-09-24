import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UpdatedCategory() {
  // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { id, name } = useParams()
  const navagite = useNavigate()
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [Isloading, setIsloading] = useState(false);
  const [updateCategory, setupdateCategory] = useState({ name: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  // FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // FUNCTION UPDATE CATEGORY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function updateItem() {
    setIsloading(true);
    try {
      await axios
        .put(`${baseURL}/category/update?categoryId=${id}`, updateCategory, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setIsloading(false);
          if (res.status === 200) {
            navagite('/admin/allCategories')
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
      setIsloading(false);
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
  // FUNCTION HANDLE OBJECT >>>>>>>>>>>>>>>>>>>
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setupdateCategory({ name: selectedValue });
  };
  // FUNCTION SUBMIT FORM >>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    updateItem();
  };
  // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return <>
    <div className="container py-5">
    <ToastContainer />
      <div className="text-center rounded-4  border-1 widthCustom mx-auto">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className=" mb-4">
            <select className="w-100 p-2 text-muted" id="name" name="name" value={updateCategory.name ? updateCategory.name : name} onChange={handleChange}  >
              <option value="">المرحلة </option>
              <option value="primary">الابتدائية</option>
              <option value="preparatory">الاعدادية </option>
              <option value="secondary">الثانوية </option>
            </select>
            {isSubmit ? updateCategory.name === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
          </div>
          <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
        </form>
      </div>
    </div>
  </>;
}
