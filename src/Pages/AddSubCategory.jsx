import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddSubCategory() {
  // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setcategories] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const grade = { primary: "الابتدائية", preparatory: "الاعدادية ", secondary: "الثانوية", };
  const [errorForm, seterrorForm] = useState("");
  const [dataAdded, setdataAdded] = useState({ name: "" });
  const [Isloading, setIsloading] = useState(false);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const navigate = useNavigate()
  // FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // FUNCTION GET ALL CATEGORIES
  async function getAllCategories() {
    const { data } = await axios.get(`${baseURL}/category`);
    setcategories(data.categories);
  }
  getAllCategories();
  // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // FUNCTION HANDLE OBJECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdataAdded({
      ...dataAdded,
      [name]: value,
    });
  };
  // FUNCTION SUBMIT FORM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    addItem();
  };
  // FUNCTION ADD SUB CATEGORY >>>>>>>>>>>>>>>>>>>>>>>>>>
  async function addItem() {
    setIsloading(true);
    console.log(dataAdded)
    try {
      await axios.post(`${baseURL}/subcategory/create?categoryId=${categoryId}`, dataAdded, {
        headers: {
          "token": `online__${Cookies.get('token')}`
        }
      }).then((res) => {
        setIsloading(false)
        console.log(res)
        if (res.data.message === "sub-category created successfuly")
          navigate('/admin/allSubCategories')
      })
    } catch (error) {
      setIsloading(false)
      console.log(error)
      seterrorForm(error.message)
    }

  }
  return <>
    <div className="container py-5">
      <div className="text-center rounded-4  border-1 widthCustom mx-auto">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className=" mb-4">
            <select className="w-100 p-2 text-muted" autoComplete="off" name="name" value={dataAdded.name} onChange={handleChange}  >
              <option value="">الصف الدراسي </option>
              <option value="first">الصف الاول</option>
              <option value="second">الصف الثاني </option>
              <option value="third">الصف الثالث </option>
              <option value="fourth">الصف الرابع </option>
              <option value="fifth">الصف الخامس </option>
              <option value="sixth">الصف السادس </option>
            </select>
            {isSubmit ? dataAdded.name === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
            <div className="my-4">
              <select className="w-100 p-2 text-muted" autoComplete="off" name="name" onChange={(e) => setCategoryId(e.target.value)}  >
                <option value="">  المرحلة الدراسية </option>
                {categories.map((category, index) => <option key={index} value={category.id}>{grade[category.name]}</option>)}
              </select>
              {isSubmit ? !categoryId ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
            </div>
          </div>
          <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa fa-spin fa-spinner"></i> : "اضف"}</button>
          {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في اضافة فئة</p> : ''}
        </form>
      </div>
    </div>
  </>
}
