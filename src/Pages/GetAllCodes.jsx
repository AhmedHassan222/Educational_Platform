import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import style from "../../src/Styles/Auth.module.css";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GetAllCodes() {
  const [codes, setcodes] = useState([]);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [errorForm, seterrorForm] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const printRef = useRef(); // the section you want to print.
  let arr=[1,2,3,4,5]
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); 
  const [recordPerPage, setrecordPerPage] = useState(); 
  const lastIndex=currentPage * recordPerPage ;
  const fristIndex=lastIndex - recordPerPage ;
 
  async function deleteItem(id) {
    try {
      await axios
        .delete(`${baseURL}/codes/delete?codeId=${id}`, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        }).then(() => {
          toast.success('قد تم الحذف', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
        })
    } catch (error) {
      seterrorForm(error.message)
      setIsloading(false);
      console.log(error)

    }
  }
  async function getAll(page) {
    const { data } = await axios.get(`${baseURL}/codes?page=${page}`);
    setcodes(data.data);
    setIsloading(false)
    setTotalPages(data.paginationInfo.totalPages)
    setrecordPerPage(data.paginationInfo.perPages)
  }
  const handlePrint = useReactToPrint({ content:()=> printRef.current, });

  function prePage(){
    setIsloading(true)
   if(currentPage >1 ){
    setCurrentPage(currentPage - 1);
    getAll(currentPage-1)
    setIsloading(false)
   }
}
function nextPage(){
    setIsloading(true)
    if(currentPage < totalPages){
        setCurrentPage(currentPage + 1);
        getAll(currentPage+1)
        setIsloading(false)
    }
}
  useEffect(() => {
    getAll(currentPage);
  }, [codes]);

  return (
    <>
      <ToastContainer />
      <div className="container py-5">
        {isLoading ? <div className="text-white position-fixed start-50 top-50  p-4" style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <i className="fa fa-spin fa-spinner h3"></i>
        </div> : ""}
        <div className=" text-start">
        <button
                  onClick={handlePrint}
                  className={` px-4 py-2 border-0 rounded-2 ${style.btnOrange} my-3  `}
                >
                  طباعة
                </button>
        </div>
        <div  ref={printRef}>
        {codes?.length > 0 ? codes?.map((item, index) => (
          <div
            key={index}
            className=" row  border border-1 border-muted p-2 rounded-2"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>{item.codeAssignedToCourse[0].courseId?.name}</h3>
              <div>

                <button
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                  className={` px-4 text-white  py-2 border-0 rounded-2 bg-danger my-3 mx-2 `}
                >
                  حذف
                </button>
              </div>
            </div>
            {item.codes.map((codes, indx) => (
              <div
               
                   /////////to print this section 
                key={indx}
                className=" col-md-3 col-lg-2 col-sm-4 w-25 text-center border border-1 border-muted p-2 border-dotted   "
              >
                <p>{codes}</p>
              </div>
            ))}
          </div>
        )) :
        <div className="text-center ">
          <i className="fa fa-spin fa-spinner h3"></i>
        </div>
            
            }
        {errorForm ? (
        <p className="text-danger py-1 text-center small">
          لديك مشكلة في اخر عملية
        </p>
      ) : (
        ""
      )}
      </div>
             {/* pagination */}
             {totalPages >1 ?   <div className=' p-2 text-center d-flex justify-content-center'>

          <button onClick={prePage} className='btn btn-primary mx-2' disabled={currentPage === 1} >
                  السابق
          </button> 
          <button   onClick={nextPage}className='btn btn-primary mx-2' disabled={currentPage === totalPages}>
       التالي  
          </button>
          </div> :"" }
          
      </div>
     
    </>
  );
}
