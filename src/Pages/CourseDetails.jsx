import { Link } from "react-router-dom"
import teacher from "../../src/Assets/Images/teacher.jpg"
import style from "../../src/Styles/CourseDetails.module.css"
import { useEffect } from "react"
export default function CourceDetails() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return <>
        <section className="container ">
            {!localStorage.getItem('user') ? <div className="w-100 rounded-3 p-2 border border-1 border-muted my-4 row justify-content-between">
                <p className="text-muted mt-2 col-sm-12 col-md-8 col-lg-10"> يجب تسجيل الدخول أولاً للوصول إلى محتوى الدورة</p>
                <Link className={`nav-link text-white p-2 rounded-3 col-sm-12 col-md-4 col-lg-2 text-center  ${style.btnOrange} `} to={'/login'}>سجل دخول الان</Link>
            </div> : ''}
            <div className="row g-3">
                <div className="col-sm-12 col-md-4">
                    <div>
                        <img src={teacher} alt="teacher image" className="w-100 rounded-3" />
                        <button className={`my-4 border-0 w-100 p-2 text-white ${style.btnOrange} rounded-3`}>انضم الان</button>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div>
                        <h3 className=' mb-3'>منهج 3 ثانوى مع مستر عبدالجواد لطلاب 3 ثانوى  </h3>
                        <div className="d-flex align-items-start mt-2">
                            <i className="fa-solid fa-play ms-1 pt-1 text-danger "></i>
                            <p className='text-muted '>5 محاضرات</p>
                        </div>
                        <div className="d-flex">
                            <p className="bg-light fitContent p-2 ms-3">الصف الثالث الثانوي </p>
                            <p className="bg-light fitContent p-2">الكيمياء </p>
                        </div>
                        <Link to={'/teacher'} className="bg-light fitContent p-2 nav-link ">مستر محمد عبدالجواد </Link>
                    </div>
                </div>
            </div>
        </section>
    </>
}