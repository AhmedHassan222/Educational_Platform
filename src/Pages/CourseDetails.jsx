import { Link, useNavigate, useParams } from "react-router-dom"
import style from "../../src/Styles/CourseDetails.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import fakeImage from "../../src/Assets/Images/fakeImage.png"
export default function CourceDetails() {
let navigate=useNavigate()
    const [course, setCourse] = useState([]);
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const { id } = useParams();
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const [errorForm, seterrorForm] = useState("");
    const [code, setCode] = useState("")
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const [openForm, setOpenForm] = useState(false);
    async function getCourseById() {
        const { data } = await axios.get(`${baseURL}/course?_id=${id}`);
        setCourse(data.data)
    }
    useEffect(() => {
        getCourseById();
    }, [course?.length])
    // FUCNTION JOIN COURSE 
    async function joinCourse(e) {
        e.preventDefault(); 
        setIsloading(true); 
        console.log(id ,{code :code})
        try {
            await axios.post(`${baseURL}/join/joincourse?courseId=${id}`,{ code: code },
                {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    }
            }).then((res) => {
                if (res.data.message === "Done") {
                }
        })
            // if (response.data.message === "Done") {
            //     navigate(`lectures/${userId}`);  // Navigate to course page if successful
            // }
    
        } catch (error) {
            console.log(error);  
            // seterrorForm(error.message); 
        }
    
        setIsloading(false); 
    }
    
    // 7lasyNC1B4 7lasy11Z9F 7lasyU7F85
    // 7lasyJEKD1 ,7lasyNX1Y2 ,7lasyFCFVC ,7lasyZC0IM
    return <>
        <section className="container py-5 ">
            {course?.length > 0 ? <div className="row g-3">
                <div className="col-sm-12 col-md-4">
                    <div>
                        <img src={course[0].photo.secure_url} alt={course[0].name} className="w-100 rounded-3" />
                        {openForm ? <div className=" py-2">
                            <div className="text-center rounded-4  border-1  ">
                                <form encType="multipart/form-data" onSubmit={joinCourse}>
                                    <div className=" my-4">
                                        <input className="p-2 w-100" type="text" placeholder="ادخل كود الانضمام" name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                                        {isSubmit ? !code ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                                    </div>
                                    <button   className={`w-100 text-white p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {isLoading ? <i className="fa-spin fa fa-spinner"></i> : "انضمام"}</button>
                                    {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في الانضمام</p> : ''}
                                </form>
                            </div>
                        </div> : <button onClick={() => setOpenForm(true)} className={`my-4 border-0 w-100 p-2 text-white ${style.btnOrange} rounded-3`}>انضم الان</button>}
                        {errorForm ? <p className="text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div>
                        <h3 className=' mb-3'> {course[0].name} </h3>
                        <div className="d-flex align-items-start mt-2">
                            <i className="fa-solid fa-play ms-1 pt-1 text-danger "></i>
                            <p className='text-muted '>{course[0]?.lectures?.length} محاضرات</p>
                        </div>
                        <div className="d-flex">
                            <p className="bg-light fitContent p-2 ms-3"> {stage[course[0].subCategoryId.name]} {grade[course[0].categoryId.name]} </p>
                        </div>
                        <Link to={'/teacher'} className="bg-light fitContent p-2 nav-link ">  {course[0].teacher.fullName} </Link>
                    </div>
                </div>
            </div> : <div className="row g-3">
                <div className="col-sm-12 col-md-4">
                    <div>
                        <img src={fakeImage} alt="loading image" className="w-100 rounded-3" />
                        <button className={`${style.btnOrange} py-4 my-4 w-100 rounded-3 border-0 `}></button>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8 p-3 ">
                    <div className="text-card-top placeholder-glow">
                        <h3 className=' mb-3 placeholder col-6'> </h3>
                        <div className="d-flex align-items-start mt-2">
                            <p className='text-muted placeholder col-3'></p>
                        </div>
                        <h3 className=' mb-3 placeholder col-4'> </h3>
                        <h3 className=' mb-3 placeholder col-3'> </h3>

                    </div>
                </div>
            </div>

            }
        </section>
    </>
}