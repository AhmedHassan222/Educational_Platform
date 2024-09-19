import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";
import moment from "moment";
import Cookies from 'js-cookie';
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
    const record = lectures.slice(fristIndex,lastIndex);
    // const number =[...Array(totalPages+1)?.keys()]?.slice(1)
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
                    setIsloading(false);
                })
        } catch (error) {
            seterrorForm(error.message)
            setIsloading(false);

        }

    }
    const decryptVideoURl = (encrypted) => {
        const bytes = CryptoJS.AES.decrypt(encrypted, "secretKey");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    // function prePage(){
    //    if(currentPage !==fristIndex){
    //     setCurrentPage(currentPage - 1);
    //     console.log()
    //    }
    // }
    // function nextPage(){
    //     if(currentPage !==lastIndex){
    //         setCurrentPage(currentPage + 1);
    //        }
    // }
    function changePage(index){

    }
    const getAllLecture = async(page = 1)=> {
        const { data } = await axios.get(`${baseURL}/lecture`);
        setlectures(data.data)
        setTotalPages(data.paginationInfo.totalPages)
        setrecordPerPage(data.paginationInfo.perPages)
        console.log({"totalPages":totalPages,"currentPage":currentPage,"recordPerPage":recordPerPage,"lastIndex":lastIndex,"fristIndex":fristIndex,"record":record,})
    }
    useEffect(() => {
        getAllLecture(currentPage)
    }, [lectures?.length,currentPage])
    return <>
        <section className="py-5 container ">
            {isLoading ? <div className="bg-white position-fixed start-50 top-50  p-3" style={{ transform: 'translate(-50%, -50%)' }}>
                <i className="fa fa-spin fa-spinner h3"></i>
            </div> : ""}
            <table className="table table-striped text-center  table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="py-3" scope="col">
                            #
                        </th>
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
                                <td className="pt-3" >{index + 1}</td>
                                <td className="col-2"><img src={item.photo.secure_url} className="w-100" alt={item.name} /></td>
                                {/* decryptText(item.videoURL) */}
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

                        {/*  */}
                        <div className='bg-info p-2 text-center'>

        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1} >
          Previous
        </button>
        <button   onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
        </button>
                        </div>


        </section>
    </>
}