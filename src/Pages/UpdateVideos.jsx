import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import style from "../../src/Styles/Auth.module.css"
export default function UpdateVideos() {
     // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     const { id } = useParams()
     let navagite = useNavigate();
     const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
     const [Isloading, setIsloading] = useState(false);
     const [errorForm, seterrorForm] = useState("");
     const [isSubmit, setIsSubmit] = useState(false);
     const [updatedVideo, setupdatedVideo] = useState({ title: "" ,videoURL:""});
     // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     async function updateItem() {
        setIsloading(true)
         try {
             await axios
                 .put(`${baseURL}/lecture/update?lectureId=${id}`, updatedVideo, {
                     headers: {
                         token: `online__${Cookies.get("token")}`,
                     },
                 })
                 .then((res) => {
                    setIsloading(false)
                     if (res.data.message === "Done") {
                         navagite('/teacherAdmin/allVideos')
                     }
                 });
         } catch (error) {
             seterrorForm(error.message)
             setIsloading(false)
         }
     }
     const handleChange = (e) => {
        const { name, value } = e.target;
        setupdatedVideo({
            ...updatedVideo,
            [name]: value,
        })
    };
     const handleSubmit = (e) => {
         setIsSubmit(true)
         e.preventDefault();
         updateItem();
     }
  return <>
  
  <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                   
                    {/* title */}
                    <div className=" mb-4">
                        <input
                            placeholder=" عنوان الفيديو"
                             autoComplete="off"
                            type="text"
                            className="w-100 p-2"
                            name="title"
                            onChange={handleChange}
                            value={updatedVideo.title}
                        />
                          {isSubmit ? updatedVideo.title === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
                    {/* videoUrl */}
                    <div className=" mb-4">
                        <input
                            placeholder=" رابط الفيديو علي اليوتيوب"
                            type="text"
                            className="w-100 p-2"
                            name="videoURL"
                            value={updatedVideo.videoURL}
                            onChange={handleChange}
                        />
                      {isSubmit ? updatedVideo.videoURL === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}

                    </div>
                
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "تعديل"}</button>
                    {errorForm.length >0 ? <p className="text-danger py-1 text-center small">لديك مشكلة في التعديل </p> : ''}
                </form>
                
            </div>
        </div>
  
  </>
}