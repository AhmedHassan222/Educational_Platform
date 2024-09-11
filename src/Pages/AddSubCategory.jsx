import { useContext, useEffect, useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import { CRUDContext } from "../Contexts/CRUDContext";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function AddSubCategory() {
  const [categoryId , setCategoryId] = useState(null);
  const [categories, setcategories] = useState([]);
  async function getAllCategories() {
    const { data } = await axios.get(`${baseURL}/category`);
    setcategories(data.categories);
  }
  let grade = {
    primary: "الابتدائية",
    preparatory: "الاعدادية ",
    secondary: "الثانوية",
  };
  let navigate = useNavigate()
  const [error, setError] = useState([]);
  const [errorForm, seterrorForm] = useState("");
  const { baseURL } = useContext(CRUDContext)
  const [dataAdded, setdataAdded] = useState({
    name: "",
  });
  const [Isloading, setIsloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdataAdded({
      ...dataAdded,
      [name]: value,
    });
  };
  const validationForm = () => {
    let schema = Joi.object({
      name: Joi.string().required(),
    });
    return schema.validate(dataAdded, { abortEarly: false });
  };
  getAllCategories();

  const handleSubmit = (e) => {
    setIsloading(true)
    e.preventDefault();
    const validate = validationForm();
    if (validate.error) {
      setError(validate.error.details)
    } else {
      addItem()
    }
    setIsloading(false)
  };
  async function addItem() {
    try {
      await axios.post(`${baseURL}/subcategory/create?categoryId=${categoryId}`, dataAdded, {
        headers: {
          "token": `online__${Cookies.get('token')}`
        }
      }).then((res) => {
        console.log(res)
      })
    } catch (error) {
      console.log(error)
    }

  }
  return <>
    <div className="container py-5">
      <div className="text-center rounded-4  border-1 widthCustom mx-auto">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>

          <div className=" mb-4">

            <select className="w-100 p-2 text-muted" id="name" name="name" value={dataAdded.name} onChange={handleChange}  >
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
                {!dataAdded.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
              </div> : ""
            )}
            <select className="w-100 p-2 text-muted my-4" id="name" name="name"  onChange={(e)=>setCategoryId(e.target.value)}  >
              <option value="">  المرحلة الدراسية </option>
              {categories.map((category, index) => <option key={index} value={category.id}>{grade[category.name]}</option>)}
            </select>
            {error?.map((err, index) =>
              err.context.label === "name" ? <div key={index}>
                {!dataAdded.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
              </div> : ""
            )}
          </div>

          <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
          {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في اضافة فئة</p> : ''}
        </form>
      </div>
    </div>
  </>
}
