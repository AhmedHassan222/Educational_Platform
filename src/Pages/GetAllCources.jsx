
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GetAllCources() {
    // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let arr = [1, 2, 3, 4];
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [Courses, setCourses] = useState([]);
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const [isLoading, setIsloading] = useState(false);
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); 
    const [recordPerPage, setrecordPerPage] = useState(); 
    const lastIndex=currentPage * recordPerPage ;
    const fristIndex=lastIndex - recordPerPage ;
   
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function nextPage(){
        setIsloading(true)
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
            setIsloading(false)
        }
    }
    function prePage(){
        setIsloading(true)
       if(currentPage >1 ){
        setCurrentPage(currentPage - 1);
        setIsloading(false)
       }
    }
    // GET ALL COURSES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function getAll(page) {
        const { data } = await axios.get(`${baseURL}/course?page=${page}`);
        if (data && data.paginationInfo) {
            setCourses(data.data)
            setTotalPages(data.paginationInfo.totalPages || 1); // Default to 1 if undefined
            setrecordPerPage(data.paginationInfo.perPages || 10); // Default to 10 per page
          } else {
            setCourses([])
            setTotalPages(1);
            setrecordPerPage(10);
          }
    }
    // DELETE COURSE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function deleteItem(id) {
        setIsloading(true);
        try {
            await axios
                .delete(`${baseURL}/course/delete?courseId=${id}`, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
                .then(() => {
                    setIsloading(false)
                    toast.success('قد تم الحذف  ', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                       
                });
        } catch (error) {
            toast.error('لا يحق لك الحذف هذا الكورس ', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });     
                setIsloading(false)    
        }
    }
    // USE EFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    useEffect(() => {
        getAll(currentPage)
    }, [Courses]);
    // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
              <ToastContainer />

            {isLoading ? <div className="text-white position-fixed start-50 top-50  p-4" style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <i className="fa fa-spin fa-spinner h3"></i>
            </div> : ""}
            <div className="container py-5 overflow-x-auto ">
                <table className="table table-striped text-center  table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="py-3" scope="col">
                                صورة الكورس
                            </th>
                            <th className="py-3" scope="col">
                                عنوان الكورس
                            </th>
                            <th className="py-3" scope="col">
                                تابع الي
                            </th>
                            <th className="py-3" scope="col">
                                تاريخ الانشاء
                            </th>
                            <th className="py-3" scope="col">
                                المعاملات{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Courses?.length > 0
                            ? Courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="col-2"><img src={item.photo.secure_url} className="w-100" alt={item.name} /></td>
                                    <td className="pt-3" >{item.name}</td>
                                    <td className="pt-3" >{stage[item.subCategoryId?.name]} {grade[item.categoryId?.name]}</td>
                                    <td className="pt-3">{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                                    <td className="pt-3   ">
                                    <div className=" d-flex align-items-center  justify-content-center ">
                                        <button
                                                className="btn btn-sm btn-danger   ms-2"
                                                onClick={() => { deleteItem(item._id) }}
                                            >
                                                حذف
                                            </button>
                                            <Link
                                                className="btn btn-primary btn-sm"
                                                to={`/admin/updatecourse/${item.name}/${item.id}`}
                                            >
                                                تعديل
                                            </Link>
                                    </div>
                                    </td>
                                </tr>
                            ))
                            : arr.map((item, index) => (
                                <tr key={index}>
                                    <th className="placeholder-glow   p-4"></th>
                                    <td className="placeholder-glow   p-4"></td>
                                    <td className="placeholder-glow   p-4"></td>
                                    <td className="placeholder-glow   p-4"></td>
                                    <td className="placeholder-glow   p-4"></td>
                                    <td className="placeholder-glow   p-4"></td>
                                </tr>
                            ))}
                    </tbody>
                </table>            
            
                      {/* pagination */}
             {totalPages >1 ?   <div className=' p-2 text-center d-flex justify-content-center'>

                <button onClick={prePage} className='btn btn-primary mx-2' disabled={currentPage === 1} >
                        السابق
                </button> 
                <div className='mx-2'>
                    الصفحة {currentPage}
                </div>
                <button   onClick={nextPage}className='btn btn-primary mx-2' disabled={currentPage === totalPages}>
                التالي  
                </button>
            </div> :"" }
            
            
            
            </div>
        </>
    );
}
