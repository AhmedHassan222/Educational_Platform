import { useEffect, useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
export default function AddVideo() {
    // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let navigate = useNavigate()
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const [courseId, setcourseId] = useState(null);
    const [errorForm, seterrorForm] = useState([]);// get from api error 
    const [video, setvideo] = useState({ title: "", videoURL: "", });
    const [image, setImage] = useState(null);
    const [Isloading, setIsloading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const validExtensions = ["image/png", "image/jpeg", "image/gif"];
    const formData = new FormData();
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTIION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION GET ALL COURSES >>>>>>>>>>>>>>>>>>>>>>>>>>
    async function getAllCourses() {
        const { data } = await axios.get(`${baseURL}/course`);
        setCourses(data.courses);
    }
    // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    useEffect(() => {
        getAllCourses()
    }, [courses])
    // FUNCTION HANDLE IMAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
    };
    // FUNCTION HANDLE OBJECT >>>>>>>>>>>>>>>>>>>>>>>>>
    const handleChange = (e) => {
        const { name, value } = e.target;
        setvideo({
            ...video,
            [name]: value,
        })
    };
    // FUNCTION ADD VIDEO >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function addItem() {
        setIsloading(true)
        formData.append("image", image);
        formData.append("title", video.title);
        formData.append("videoURL", video.videoURL);
        try {
            await axios.post(`${baseURL}/lecture/create?courseId=${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": `online__${Cookies.get('token')}`
                }
            }).then((res) => {
                setIsloading(false)
                if (res.data.message === "created successfuly") {
                    navigate('/teacherAdmin/allVideos')
                }
            })
        } catch (error) {
            setIsloading(false)
            seterrorForm(error.message)
        }
    }
    // FUNCTION SUBMIT FORM >>>>>>>>>>>>>>>>>>>>>>>
    const handleSubmit = (e) => {
        setIsSubmit(true)
        e.preventDefault();
        addItem()
    };
    // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className=" mb-4">
                        <input placeholder=" ادخل الصورة" type="file" className="w-100 p-2" name="images" onChange={handleImageChange} />
                        {isSubmit ? <>
                            {!image ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            {image ? !validExtensions.includes(image?.type) ? <p className="small fw-medium  py-2 text-end text-danger">هذا الامتداد غير صحيح</p> : "" : ""}
                        </> : ""}
                    </div>
                    <div className=" mb-4">
                        <input placeholder=" عنوان الفيديو" autoComplete="off" type="text" className="w-100 p-2 text-black" name="title" onChange={handleChange} value={video.title} />
                        {isSubmit ? video.title === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
                    {/* videoUrl */}
                    <div className=" mb-4">
                        <input placeholder=" رابط الفيديو علي اليوتيوب" type="text" className="w-100 p-2" name="videoURL" value={video.videoURL} onChange={handleChange} />
                        {isSubmit ? video.videoURL === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
                    {/* to know id => course  not send value to api but sending courseId*/}
                    <div className="my-4">
                        <select className="w-100 p-2 text-muted" autoComplete="off" onChange={(e) => setcourseId(e.target.value)}  >
                            <option value="">  الكورسات</option>
                            {courses?.map((category, index) => <option key={index} value={category.id}>{category.name}-{stage[category.subCategoryId.name]} {grade[category.categoryId.name]}</option>)}
                        </select>
                        {isSubmit ? !courseId ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
                    {errorForm.length > 0 ? <p className="text-danger py-1 text-center small">لديك مشكلة في اضافة المحاضرة </p> : ''}
                </form>
            </div>
        </div>
    </>
}
