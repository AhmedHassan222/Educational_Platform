import Filter from './../Components/Filter';
import teacher from "../../src/Assets/Images/teacher.jpg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Cources() {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [courses,setCourses]= useState([]);
    async function getAll() {
        const { data } = await axios.get(`${baseURL}/category`);
        // setCourses(data.categories);
        console.log(data)
    }
    useEffect(() => {
        window.scroll(0, 0)
        getAll();
    }, [])
    return <>
        <section className="py-5 container ">
            <div className="row g-3 ">
                <div className="col-lg-3">
                    <Filter />
                </div>
                <div className="col-lg-9 row g-3 ">
                    {courses?.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                        <div className='border-1 border border-muted rounded-3'>
                            <Link to={`/cources/5`}>
                                <img src={item.image} alt="teacher image" className='w-100' />
                            </Link>
                            <div className="p-3">
                                <p className="text-muted my-2">الصف الثالث الثانوي 2025 </p>
                                <Link className='nav-link' to={`/cources/5`}>
                                    <h3 className='h5 mb-3'>{item.name} </h3>
                                </Link>
                                <div className="d-flex align-items-start mt-2">
                                    <i className="fa-solid fa-play ms-1 pt-1 text-danger small"></i>
                                    <p className='text-muted small'>5 محاضرات</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </section>
    </>
}