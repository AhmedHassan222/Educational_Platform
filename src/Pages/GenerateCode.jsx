import { useEffect, useState } from "react";
import style from "../../src/Styles/Auth.module.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

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
    });
    console.log(formData)
  };
  async function addCodes() {
    setIsloading(true)
    console.log(formData ,courseId)
    try {
        await axios.post(`${baseURL}/codes/create?courseId=${courseId}`, formData, {
            headers: {
                "token": `online__${Cookies.get('token')}`
            }
        }).then((res) => {
            setIsloading(false)
            console.log(res)
            if (res.data.message === "codes created successfuly") {
                navigate('/admin/allCodes')
            }
        })
    } catch (error) {
        console.log(error)
        setIsloading(false)
        seterrorForm(error.message)
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
                            {Courses?.map((course, index) => <option key={index} value={course._id}>{course.name}-{stage[course.subCategoryId.name]} {grade[course.categoryId.name]}</option>)}
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
