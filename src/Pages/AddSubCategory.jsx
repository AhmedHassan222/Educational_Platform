import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddSubCategory() {
  // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [categoryId, setCategoryId] = useState(null)

  const [categories, setcategories] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const grade = { primary: "الابتدائية", preparatory: "الاعدادية ", secondary: "الثانوية", };
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
    try {
      await axios.post(`${baseURL}/subcategory/create?categoryId=${categoryId}`, dataAdded, {
        headers: {
          "token": `online__${Cookies.get('token')}`
        }
      }).then((res) => {
        setIsloading(false)
        if (res.data.message === "sub-category created successfuly")
          navigate('/admin/allSubCategories')
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
      })
    } catch (error) {
      setIsloading(false)
      if(error.response.data.Error ==='wrong  token'){
        Cookies.remove('token');
        navigate('/login')
     } else {
        toast.error(" هناك مشكلة في اضافة صف", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
        );
      }
    }
  }
  return <>
    <div className="container py-5">
      <ToastContainer />
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

        </form>
      </div>
    </div>
  </>
}
