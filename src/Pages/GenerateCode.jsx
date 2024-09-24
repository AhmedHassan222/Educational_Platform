import { useEffect, useState } from "react";
import style from "../../src/Styles/Auth.module.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GenerateCode() {

  const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
  const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
  const [formData, setFormData] = useState({
    numberOfCodes: "",
    fromDate: "",
    toDate: "",
  });
  const [Isloading, setIsloading] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [courseId, setcourseId] = useState(null);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  let navigate = useNavigate()
  const [errorForm, seterrorForm] = useState([]);// get from api error 
  const [isSubmit, setIsSubmit] = useState(false);

  async function getAll() {
    const { data } = await axios.get(`${baseURL}/course`);
    setCourses(data.data)
}
 
  useEffect(() => {
    getAll();
}, [Courses?.length])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  };
  async function addCodes() {
    setIsloading(true)
    try {
        await axios.post(`${baseURL}/codes/create?courseId=${courseId}`, formData, {
            headers: {
                "token": `online__${Cookies.get('token')}`
            }
        }).then((res) => {
            setIsloading(false)
            if (res.data.message === "codes created successfuly") {
                navigate('/admin/allCodes')
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
        })
    } catch (error) {
        setIsloading(false)
        if(error.response.data.Error ==='wrong  token'){
          Cookies.remove('token');
          navigate('/login')
      }else{
          toast.error(" هناك مشكلة في انشاء الاكواد ", {
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
  const handleSubmit = (e) => {
    setIsSubmit(true)
    e.preventDefault();
      addCodes()
  };



  return (
    <>
      <div className="container py-5">
      <ToastContainer />

        <div className="text-center rounded-4  border-1 widthCustom mx-auto">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            {/* numsOfCodes */}
            <div className=" mb-4">
              <input
                placeholder=" ادخل العدد الذي تريده "
                type="number"
                className="w-100 p-2"
                name="numberOfCodes"
                value={formData.numberOfCodes}
                onChange={handleChange}
              />
            </div>
                   {/* fromDate */}
              <div className="mb-4">
                <label htmlFor="fromDate" className="py-2 text-end w-100 ">البداية</label>
                <input
                id="fromDate"
                  type="date"
                  className="w-100 p-2"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                />
              </div>
              {/* toDate */}
              <div className="mb-4">
                <label htmlFor="toDate" className="py-2 text-end w-100 ">النهاية</label>
                <input
                  id="toDate"
                  type="date"
                  className="w-100 p-2"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                />
              </div>
              {/* to know who's course  */}
              <div className="my-4">
                        <select className="w-100 p-2 text-muted" autoComplete="off" name="name" onChange={(e) => setcourseId(e.target.value)}  >
                            <option value="">   الصف  الدراسي </option>
                            {Courses?.map((course, index) => <option key={index} value={course?._id}>{course?.name}-{stage[course?.subCategoryId?.name]} {grade[course?.categoryId?.name]}</option>)}
                        </select>
                        {isSubmit ? !courseId ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
            <button
              type="submit"
              className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}
            >
              {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "انشاء"}
              
            </button>
          </form>
          {errorForm.length >0 ? <p className="text-danger py-1 text-center small">لديك مشكلة في انشاء اكواد</p> : ''}
        </div>
      </div>
    </>
  );
}
