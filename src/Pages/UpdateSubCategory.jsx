import axios from "axios";
import Joi from "joi";
import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateSubCategory() {
  const { id, name } = useParams()
  let navagite = useNavigate()
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [Isloading, setIsloading] = useState(false);
  const [error, setError] = useState([]);
  const [errorForm, seterrorForm] = useState("");
  const [updateSubCategory, setupdateSubCategory] = useState({ name: "" });



  async function updateItem() {
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details);
    }
    try {
      await axios
        .put(`${baseURL}/category/update?categoryId=${id}`, updateSubCategory, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            navagite('/admin/allCategories')
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setupdateSubCategory({ name: selectedValue });
  };

  const validationForm = () => {
    let schema = Joi.object({
      name: Joi.string().required(),
    });
    return schema.validate(updateSubCategory, { abortEarly: false });
  };
  const handleSubmit = (e) => {
    setIsloading(true)
    e.preventDefault();
    console.log(updateSubCategory)
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details)
    } else {
      updateItem()
    }
    setIsloading(false)
  };

  // return <>

  //   <div className="container py-5">
  //     <div className="text-center rounded-4  border-1 widthCustom mx-auto">
  //       <form encType="multipart/form-data" onSubmit={handleSubmit}>

  //         <div className=" mb-4">

  //           <select className="w-100 p-2 text-muted" id="name" name="name" value={updateSubCategory.name?updateSubCategory.name:name} onChange={handleChange}  >
  //             <option value="">الصف الدراسي </option>
  //             <option value="first">الصف الاول</option>
  //             <option value="second">الصف الثاني </option>
  //             <option value="third">الصف الثالث </option>
  //             <option value="fourth">الصف الرابع </option>
  //             <option value="fifth">الصف الخامس </option>
  //             <option value="sixth">الصف السادس </option>
  //           </select>
  //           {error?.map((err, index) =>
  //             err.context.label === "name" ? <div key={index}>
  //               {!dataAdded.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
  //             </div> : ""
  //           )}
  //           <select className="w-100 p-2 text-muted my-4" id="name" name="name" value={updateSubCategory.name?updateSubCategory.name:name}  onChange={(e) => setCategoryId(e.target.value)}  >
  //             <option value="">  المرحلة الدراسية </option>
  //             {categories.map((category, index) => <option key={index} value={category.id}>{grade[category.name]}</option>)}
  //           </select>
  //           {error?.map((err, index) =>
  //             err.context.label === "name" ? <div key={index}>
  //               {!dataAdded.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
  //             </div> : ""
  //           )}
  //         </div>

  //         <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
  //         {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في اضافة فئة</p> : ''}
  //       </form>
  //     </div>
  //   </div>


  // </>;
}
