import { useEffect, useState } from "react";
import style from "../../src/Styles/Filter.module.css"
import axios from "axios";
export default function Filter() {
    let stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    let grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [isOpenStage, setIsOpenStage] = useState(false);
    const [isOpenCourses, setIsOpenCourses] = useState(false);
    const [supCategories, setsupCategories] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [searchWord, setsearchWord] = useState("");
    async function getAllSubCategories() {
        const { data } = await axios.get(`${baseURL}/subcategory/`);
        setsupCategories(data.Subcategories)
    }
    async function getAllCourses() {
        const { data } = await axios.get(`${baseURL}/course`);
        setCourses(data.data)
    }
    useEffect(() => {
        getAllSubCategories();
        getAllCourses()
    }, []);
    return <>
        <div>
            <input type="text" className="w-100 p-3 bg-light"  placeholder="ابحث عن دورة" />
            <div className="border border-1 border-muted my-3 rounded-2">
                <div className="d-flex justify-content-between  pt-3 px-3 pb-2  align-items-center">
                    <p className="text-black small pt-2">الصفوف الدراسية</p>
                    <i onClick={() => setIsOpenStage(!isOpenStage)} className={`${style.link} fa-solid fa-angle-down bg-light p-2 rounded-circle `}></i>
                </div>
                {isOpenStage ? <div>
                    <hr className="text-muted" />
                    {supCategories?.length > 0 ? supCategories.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                        <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                        <p className="text-muted "> {stage[item.name]} {grade[item.categoryId.name]}   </p>
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
                        <p className="text-muted ">  {item.name}</p>
                    </div>) : <div className="text-center p-5"><i className="fa fa-spin fa-spinner"></i></div>}
                </div> : ""}
            </div>
            <div className="d-flex flex-nowrap align-items-center">
                <button className={`  w-75 mx-3 text-white btn ${style.btnOrange} my-2`}> بحث</button>
                <span className={` w-25 mx-3 text-danger`}> الغاء</span>
            </div>
        </div>
    </>
}