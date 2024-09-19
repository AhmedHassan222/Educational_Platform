import Filter from './../Components/Filter';
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import style from "../../src/Styles/CourseDetails.module.css"
import { FilterContext } from '../Contexts/FilterContext';
export default function Cources() {

    const arr = [1, 2, 3, 4, 5, 6]
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const [courses, setCourses] = useState([]);
    const [errorForm, seterrorForm] = useState([]);
    const [dispalyCourses, setDisplayCourses] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { stageName, gradeFilterName, setStage, setGrade, error, filterCourses, setGradeName, setStageName, setWordSearch } = useContext(FilterContext);
    async function getAll(numberOfPage) {
        console.log(numberOfPage)
        try {
            const { data } = await axios.get(`${baseURL}/course?page=${numberOfPage}`);
            setCourses(data.data);
            setTotalPages(data.paginationInfo.totalPages) // 2
        } catch (error) {
            seterrorForm(error.message)
        }
    }
    // FUNCTION NEXT 
    function next() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            getAll(currentPage)
        }
    }
    function prev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            getAll(currentPage)
        }
    }

    // FUNCTION PREV
    useEffect(() => {
        getAll(currentPage);
        setDisplayCourses(courses);
    }, [currentPage])
    function resetFilter() {
        setGrade('');
        setStage('');
        setWordSearch('');
        setGradeName('');
        setStageName('');
    }
    useEffect(() => {
        setDisplayCourses(filterCourses?.length > 0 ? filterCourses : courses)
    }, [filterCourses])
    return <>
        <section className="py-5 container ">
            <div className="row g-3 ">
                <div className="col-lg-3">
                    <Filter />
                </div>
                <div className="col-lg-9  ">
                    {gradeFilterName || stageName ? <div className="d-flex w-100 mb-4 align-items-center">
                        {gradeFilterName ? <div className=" ">
                            <div className="d-flex bg-light justify-content-between py-2  px-2 small align-items-center">
                                <span className="ms-4 ">{gradeFilterName}</span>
                                <i onClick={() => { setGrade(''); setGradeName('') }} className='fa-solid fa-x '></i>
                            </div>
                        </div> : ''}
                        {stageName ? <div className=" ">
                            <div className="d-flex bg-light mx-3 justify-content-between py-2  px-2 small align-items-center">
                                <span className="mx-4">{stageName}</span>
                                <i onClick={() => { setStage(''); setStageName('') }} className='fa-solid fa-x '></i>
                            </div>
                        </div> : ''}
                        < div className="text-start" >
                            <span onClick={resetFilter} className={`mx-3 py-2 px-2 small text-danger`}> الغاء كل الفلاتر</span>
                        </div >
                    </div> : ""}
                    <div className="row g-3 mt-1">
                        {errorForm.length > 0 || error ? <p className="text-danger py-1 text-center small"> يوجد مشكلة  </p> : ''}
                        {dispalyCourses?.length > 0 ? dispalyCourses?.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                            <div className='border-1 border border-muted rounded-3'>
                                <Link to={`/cources/${item._id}`}>
                                    <img src={item.photo.secure_url} alt="teacher image" className='w-100' />
                                </Link>
                                <div className="p-3">
                                    <p className="text-muted my-2">{stage[item.subCategoryId.name]} {grade[item.categoryId.name]} </p>
                                    <Link className='nav-link text-black' to={`/cources/${item._id}`}>
                                        <h3 className='h5 mb-3'>{item.name} </h3>
                                    </Link>
                                    <div className="d-flex align-items-start mt-2">
                                        <i className="fa-solid fa-play ms-1 pt-1 text-danger small"></i>
                                        <p className='text-muted small'>{item?.lectures?.length} محاضرات</p>
                                    </div>
                                </div>
                            </div>
                        </div>) : arr.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                            <div className="card" aria-hidden="true">
                                <img src={fakeImage} className="card-img-top w-100" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title placeholder-glow">
                                        <span className="placeholder col-6"></span>
                                    </h5>
                                    <p className="card-text placeholder-glow">
                                        <span className="placeholder col-7"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-6"></span>
                                        <span className="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </div>)
                        }
                    </div>
                </div>
                <div className='d-flex justify-content-center my-5'>
                    <button disabled={currentPage === 1} className={`text-white border-0 small p-2  ${style.btnOrange} `} onClick={prev}>السابق</button>
                    {/* looping */}
                    {arr.map((item, index) => <span onClick={()=>getAll(item)} className='border border-muted p-2' key={index}>{item}</span>)}
                    <button disabled={currentPage === totalPages} className={`text-white border-0 small p-2 ${style.btnOrange} `} onClick={next}>التالي</button>
                </div>
            </div>
        </section>
    </>
}