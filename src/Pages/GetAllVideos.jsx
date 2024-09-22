import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";
import moment from "moment";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GetAllVideos() {

    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [lectures, setlectures] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1); 
    const [recordPerPage, setrecordPerPage] = useState(); 
    const lastIndex=currentPage * recordPerPage ;
    const fristIndex=lastIndex - recordPerPage ;
   

    let arr = [1, 2, 3, 4];

    async function deleteItem(id) {
        setIsloading(true);
        try {
            await axios
                .delete(`${baseURL}/lecture/delete?lectureId=${id}`, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                }).then(()=>{
                    setIsloading(false)
                    toast.success('قد تم الحذف', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                })
        } catch (error) {
            toast.error('لديك مشكلة في حذف الفيديو ', {
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
    const decryptVideoURl = (encrypted) => {
        const bytes = CryptoJS.AES.decrypt(encrypted, "secretKey");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    
    function prePage(){
        setIsloading(true)
       if(currentPage >1 ){
        setCurrentPage(currentPage - 1);
        getAllLecture(currentPage-1)
        setIsloading(false)
       }
    }
    function nextPage(){
        setIsloading(true)
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
            getAllLecture(currentPage+1)
            setIsloading(false)
        }
    }

    const getAllLecture = async(page)=> {
       try {
        setIsloading(true)
        const { data } = await axios.get(`${baseURL}/lecture?page=${page}`);
        if (data && data.paginationInfo) {
            setlectures(data.data)
            setIsloading(false)
            setTotalPages(data.paginationInfo.totalPages || 1); // Default to 1 if undefined
            setrecordPerPage(data.paginationInfo.perPages || 10); // Default to 10 per page
          } else {
            setlectures([])
            setIsloading(false)
            setTotalPages(1);
            setrecordPerPage(10);
          }
       } catch (error) {
        seterrorForm(error.message)
        setIsloading(false)
       }
        }
    useEffect(() => {
        window.scroll(0,0)
        getAllLecture(currentPage)
    }, [lectures?.length])
    return <>
        <section className="py-5 container ">
        <ToastContainer />

            {isLoading ? <div className=" position-fixed start-50 text-light top-50  p-3" style={{ transform: 'translate(-50%, -50%)' ,backgroundColor: 'rgba(0,0,0,0.6)'}}>
                <i className="fa fa-spin fa-spinner h3"></i>
            </div> : ""}
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
                            تاريخ الانشاء
                        </th>
                        <th className="py-3" scope="col">
                            المعاملات{" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lectures?.length > 0
                        ? lectures.map((item, index) => (
                            <tr key={index}>
                                <td className="col-2"><img src={item.photo.secure_url} className="w-100" alt={item.name} /></td>
                                <td className="pt-3" > <Link to={``} target='_blank'>{item.title}</Link> </td>
                                <td className="pt-3">{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                                <td className="pt-3">
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => { deleteItem(item._id) }} >حذف  </button>
                                    <Link className="btn btn-primary btn-sm" to={`/teacherAdmin/updateVideos/${item.title}/${item._id}`} >  تعديل  </Link>
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
                            </tr>
                        ))}
                </tbody>
            </table>
            {errorForm ? <p className="text-danger py-1 text-center small">لديك مشكلة في  اخر عملية</p> : ''}

                       {/* pagination */}
             {totalPages >1 ?   <div className=' p-2 text-center d-flex justify-content-center'>

                <button onClick={prePage} className='btn btn-primary mx-2' disabled={currentPage === 1} >
                        السابق
                </button> 
                <button   onClick={nextPage}className='btn btn-primary mx-2' disabled={currentPage === totalPages}>
                التالي  
                </button>
                </div> :"" }    


        </section>
    </>
}