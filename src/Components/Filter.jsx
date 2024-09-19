import { useContext, useEffect, useState } from "react";
import style from "../../src/Styles/Filter.module.css"
import axios from "axios";
import { FilterContext } from "../Contexts/FilterContext";
export default function Filter() {
    let stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    let grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [isOpenStage, setIsOpenStage] = useState(false);
    const [isOpenCourses, setIsOpenCourses] = useState(false);
    const [isOpenGrade, setIsOpenGrade] = useState(false);
    const [supCategories, setsupCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [Courses, setCourses] = useState([]);
    const { setWordSearch, setStage, setCourse, setGrade } = useContext(FilterContext)
    async function getAllCategories() {
        const { data } = await axios.get(`${baseURL}/category/`);
        setCategories(data.categories)
    }

    async function getAllCourses() {
        const { data } = await axios.get(`${baseURL}/course`);
        setCourses(data.data)
    }
    async function getAllSubCategories() {
        const { data } = await axios.get(`${baseURL}/subcategory/`);
        setsupCategories(data.Subcategories)
        setCourses(data.data)
    }
    useEffect(() => {
        getAllCategories();
        getAllSubCategories();
        getAllCourses()
    }, []);
    function resetFilter() {
        setGrade('');
        setCourse('');
        setStage('');
        setWordSearch('');
    }
    return <>
        <div>
            <input type="text" className="w-100 p-3 bg-light" placeholder="ابحث عن دورة" />
            <div className="border border-1 border-muted my-3 rounded-2">
                <div className="d-flex justify-content-between  pt-3 px-3 pb-2  align-items-center">
                    <p className="text-black small pt-2">الصفوف</p>
                    <i onClick={() => setIsOpenStage(!isOpenStage)} className={`${style.link} fa-solid fa-angle-down bg-light p-2 rounded-circle `}></i>
                </div>
                {isOpenStage ? <div>
                    <hr className="text-muted" />
                    {supCategories?.length > 0 ? supCategories.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                        <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                        <p onClick={() => setStage(item._id)} className="text-muted "> {stage[item.name]}   </p>
                    </div>) : <div className="text-center p-5"><i className="fa fa-spin fa-spinner"></i></div>}
                </div> : ""}
            </div>
            <div className="border border-1 border-muted my-3 rounded-2">
                <div className="d-flex justify-content-between  pt-3 px-3 pb-2  align-items-center">
                    <p className="text-black small pt-2"> الكورسات المتاحة</p>
                    <i onClick={() => setIsOpenCourses(!isOpenCourses)} className={`${style.link} fa-solid fa-angle-down bg-light p-2 rounded-circle `}></i>
                </div>
                {isOpenCourses ? <div >
                    <hr className="text-muted" />
                    {Courses?.length > 0 ? Courses.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                        <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                        <p onClick={() => setCourse(item._id)} className="text-muted ">  {item.name}</p>
                    </div>) : <div className="text-center p-5"><i className="fa fa-spin fa-spinner"></i></div>}
                </div> : ""}
            </div>
            <div className="text-start">
                <span onClick={resetFilter} className={` w-25 mx-3 text-danger w-100`}> الغاء الفلترة</span>
            </div>
        </div>
    </>
}