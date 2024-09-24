import React, { useEffect, useState } from 'react'
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import CryptoJS from 'crypto-js';
export default function Lectures() {
  let arr = [1, 2, 3]
  let { id } = useParams();
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [lectures, setlectures] = useState([]);
  const [errorForm, seterrorForm] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1); 
  const [recordPerPage, setrecordPerPage] = useState(); 
  const lastIndex=currentPage * recordPerPage ;
  const fristIndex=lastIndex - recordPerPage ;
 
  const decryptVideoURL = (encryptedURL) => {
    const bytes = CryptoJS.AES.decrypt(encryptedURL, "Gl?11£5R8:5z£-%");
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  async function getAll(page) {
    try {
      const { data } = await axios.get(`${baseURL}/lecture?courseId=${id}?page=${page}`);
      setlectures(data.data);
    } catch (error) {
      console.log(error)
      // seterrorForm(error.message)
    }

  }
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
    getAll()
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
    //   document.onkeydown = function (e) {                                                     // console                  // View source             // saving 
    //     if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||e.ctrlKey && e.shiftKey && e.key === "J" || e.ctrlKey && e.key === "u" ||e.ctrlKey && e.key === "s" ||e.key === "PrintScreen") {
    //       e.preventDefault()
    //       return false;
    //     }
    //   };
    //   return () => {
    //     document.removeEventListener('contextmenu', () => {});
    //     document.onkeydown = null;
    //   };
  }, [lectures?.length])
  // alkymXGYZ8 alkymB4PKU alkymRRFOE alkym1LLRY alkymZ0PKZ
  return <>
       <div className="row g-3 mt-1">
                        {errorForm.length > 0 ? <p className="text-danger py-1 text-center small"> يوجد مشكلة  </p> : ''}
                        {lectures?.length > 0 ? lectures?.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                            <div className='border-1 border border-muted rounded-3'>
                                <Link to={`/cources/${item._id}`}>
                                    <img src={item.photo.secure_url} alt="teacher image" className='w-100' />
                                </Link>
                                <div className="p-3">
                                    <Link className='nav-link text-black' to={`/cources/${item._id}`}>
                                        <h3 className='h5 mb-3'>{item?.title} </h3>
                                    </Link>
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
                                    </p>
                                </div>
                            </div>
                        </div>)
                        }
                    </div>


                {/* paginations */}
                    {totalPages >1 ?   <div className=' p-2 text-center d-flex justify-content-center align-items-center'>

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
  </>
 
}