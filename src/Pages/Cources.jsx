import Filter from './../Components/Filter';
import teacher from "../../src/Assets/Images/teacher.jpg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Cources() {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const [courses,setCourses]= useState([]);
    const [errorForm,seterrorForm]= useState([]);
    async function getAll() {
      try {
        const { data } = await axios.get(`${baseURL}/course`);
        setCourses(data.courses);
      } catch (error) {
        seterrorForm(error.message)
      }
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
                    {errorForm.length >0 ? <p className="text-danger py-1 text-center small"> يوجد مشكلة  </p> : ''}
                    {courses?.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                        <div className='border-1 border border-muted rounded-3'>
                            <Link to={`/cources/${item._id}`}>
                                <img src={item.photo.secure_url} alt="teacher image" className='w-100' />
                            </Link>
                            <div className="p-3">
                                <p className="text-muted my-2">{stage[item.subCategoryId.name]} {grade[item.categoryId.name]} </p>
                                <Link className='nav-link' to={`/cources/5`}>
                                    <h3 className='h5 mb-3'>{item.name} </h3>
                                </Link>
                                <div className="d-flex align-items-start mt-2">
                                    <i className="fa-solid fa-play ms-1 pt-1 text-danger small"></i>
                                    <p className='text-muted small'>{index +1} محاضرات</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </section>
    </>
}