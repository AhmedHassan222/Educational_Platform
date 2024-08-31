

import Filter from './../Components/Filter';
import teacher from "../../src/Assets/Images/teacher.jpg"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
export default function GetAllVideos() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return <>
        <section className="py-5 container ">
            <div className="row g-3 ">
                {arr.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
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
                            <p className="bg-light fitContent p-1">الكيمياء </p>
                        </div>
                    </div>
                </div>)}
            </div>
        </section>
    </>
}