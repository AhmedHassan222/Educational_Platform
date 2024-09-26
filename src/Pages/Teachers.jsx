import { Link } from "react-router-dom";
import mr from "../../src/Assets/Images/download.jpg"
import mrs from "../../src/Assets/Images/women.jpg"
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import style from "../../src/Styles/Teacher.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Teachers() {
    // VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const arr = [1, 2, 3, 4]
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [allTeachers, setallTeachers] = useState([]);
    // FUNCTION GET ALL TEACHERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function getAll() {
        const { data } = await axios.get(`${baseURL}/auth/teachers`);
        setallTeachers(data.data)
    }
    // USEEFFECT  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    useEffect(() => {
        getAll();
    }, [allTeachers]);
    // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <div className="container py-5">
            <div className="row g-2">
                {allTeachers?.length > 0 ? allTeachers.map((item, index) => <div key={index} className="col-md-4 col-lg-3">
                    <div className="border border-1 border-muted py-4 px-3 text-center">
                        {/* if not image in api  */}
                        <img src={item?.profileImage ? item?.profileImage?.secure_url : item.gender ==="male" ? mr :mrs  } className="w-75  rounded-circle " alt={item.fullName} />
                        <p className="text-muted fw-bold my-3"> {item.fullName} </p>
                        <Link to={`/teacher/${item._id} `} className={`w-100 rounded-2 py-2 text-white ${style.btnOrange} border-0 small nav-link`}>ملف المعلم</Link>
                    </div>
                </div>) : arr.map((item, index) => <div key={index} className="col-md-4 col-lg-3 ">
                    <div className="border border-1 border-muted py-4 px-3 text-center ">
                        <img src={fakeImage} alt="fakeImage" className="w-25 rounded-circle " />
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow my-3">
                                <span className="placeholder col-6"></span>
                            </h5>
                        </div>
                        <Link to={""} className={`w-100 rounded-2 py-3 placeholder  text-white ${style.btnOrange} border-0 small nav-link `}> </Link>
                    </div>
                </div>)}
            </div>
        </div>
    </>
}


