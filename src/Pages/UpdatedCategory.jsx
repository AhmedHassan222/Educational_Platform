import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
export default function UpdatedCategory() {
  // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { id, name } = useParams()
  const navagite = useNavigate()
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [Isloading, setIsloading] = useState(false);
  const [errorForm, seterrorForm] = useState("");
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
        });
    } catch (error) {
      setIsloading(false);
      seterrorForm(error.message)
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
          {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في التعديل</p> : ''}
        </form>
      </div>
    </div>
  </>;
}
