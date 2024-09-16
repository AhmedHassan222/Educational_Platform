import { Link } from "react-router-dom";
import mr from "../../src/Assets/Images/download.jpg"
import mrs from "../../src/Assets/Images/women.jpg"
import style from "../../src/Styles/Teacher.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Teachers() {
        const arr = [1, 2, 3, 4]

    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [allTeachers, setallTeachers] = useState([]);

    async function getAll() {
        const { data } = await axios.get(`${baseURL}/auth/teachers`);
        setallTeachers(data.users)
    }
    useEffect(() => {
        getAll();
    }, [allTeachers]);
    return <>
        <div className="container py-5">
            <div className="row g-2">
                {allTeachers.length > 0 ? allTeachers?.map((item,index) => <div key={index} className="col-md-4 col-lg-3">
                    <div className="border border-1 border-muted py-4 px-3 text-center">
                        {/* if not image in api  */}
                        <img src={ item.image || item.gender=="male" ? mr : mrs  } alt="mr image" className="w-25 rounded-circle" />
                        <p className="text-muted fw-bold my-3"> {item.fullName} </p>
                        <Link to={`/teacher/${item._id} `} className={`w-100 rounded-2 py-2 text-white ${style.btnOrange} border-0 small nav-link`}>ملف المعلم</Link>
                    </div>
                </div>)   : arr.map((item,index)=> <div key={index}  className="col-md-4 col-lg-3 placeholder">
                    <div className="border border-1 border-muted py-4 px-3 text-center placeholder">
                        <img src={''} alt="mr image" className="w-25 rounded-circle" />
                        <p className="text-muted fw-bold my-3 ">  </p>
                        <Link to={""} className={`w-100 rounded-2 py-2 text-white ${style.btnOrange} border-0 small nav-link `}> </Link>
                    </div>
                </div>)}

                {/* //  <div className="text-center"> <i className="fa fs-1 fa-spinner   fa-spin "></i> </div>  */}

            </div>
        </div>
    </>
}


