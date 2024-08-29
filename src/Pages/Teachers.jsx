import { Link } from "react-router-dom";
import mr from "../../src/Assets/Images/mr.jpg"
import style from "../../src/Styles/Teacher.module.css";
export default function Teachers() {
    const arr = [1,2,3,4,5,6,7,8,9,10,11,12]
    return <>
        <div className="container py-5">
            <div className="row g-2">
                {arr.map((item,index) => <div key={index} className="col-md-4 col-lg-3">
                    <div className="border border-1 border-muted py-4 px-3 text-center">
                        <img src={mr} alt="mr image" className="w-25 rounded-circle" />
                        <p className="text-muted fw-bold my-3">مستر أحمد حسن</p>
                        <Link to={`/tacher/3`} className={`w-100 rounded-2 py-2 text-white ${style.btnOrange} border-0 small nav-link`}>ملف المعلم</Link>
                    </div>
                </div>)}
            </div>
        </div>
    </>
}