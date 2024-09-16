import { Link, useParams } from "react-router-dom"
import mr from "../../src/Assets/Images/mr.jpg"
import teacher from "../../src/Assets/Images/teacher.jpg"
export default function TeacherDetails() {
    let {id}= useParams() ;
    console.log(id)
    const classes = [1, 2, 3, 4,5]
    return <>
        <div className="container py-5">
            <div className="row g-3">
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="text-center rounded-5 border-1 border border-muted p-5">
                        <img src={mr} alt="mr image" className="w-25" />
                        <p className="bg-light  my-4" >استاذ الفيزياء  </p>
                        <h3 >مستر محمد ابراهيم</h3>
                        <p className="text-muted fs-6">
                            روابط التواصل
                        </p>
                        <div className="d-flex justify-content-center">
                            <i className="fa-brands fa-whatsapp fs-5 mx-2"></i>
                            <i className="fa-solid fa-envelope fs-5 mx-2"></i>
                            <i className="fa-solid fa-phone fs-5 mx-2"></i>
                        </div>
                    </div>
                </div>
                {classes.map((item, index) => <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                    <div className='border-1 border border-muted rounded-3'>
                        <Link to={`/cources/5`}>
                            <img src={teacher} alt="teacher image" className='w-100' />
                        </Link>
                        <div className="p-3">
                            <p className="text-muted my-2">الصف الثالث الثانوي 2025 </p>
                            <Link className='nav-link' to={`/cources/5`}>
                                <h3 className='h5 mb-3'>منهج 3 ثانوى مع مستر عبدالجواد لطلاب 3 ثانوى  </h3>
                            </Link>
                            <div className="d-flex align-items-start mt-2">
                                <i className="fa-solid fa-play ms-1 pt-1 text-danger small"></i>
                                <p className='text-muted small'>5 محاضرات</p>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div >
    </>
}