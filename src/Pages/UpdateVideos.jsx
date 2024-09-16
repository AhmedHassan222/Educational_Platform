import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import style from "../../src/Styles/Auth.module.css"
export default function UpdateVideos() {
    // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const { id,title } = useParams()
    let navagite = useNavigate();
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [Isloading, setIsloading] = useState(false);
    const [errorForm, seterrorForm] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [image, setImage] = useState(null);
    const [updatedVideo, setupdatedVideo] = useState({ title: title, videoURL: "" });
    const validExtensions = ["image/png", "image/jpeg", "image/gif"];
    const formData = new FormData();
    // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function updateItem() {
        setIsloading(true)
        formData.append("image", image);
        formData.append("title", updatedVideo.title);
        formData.append("videoURL", updatedVideo.videoURL);
        try {
            await axios
                .put(`${baseURL}/lecture/update?lectureId=${id}`, formData, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
                .then((res) => {
                    setIsloading(false)
                    if (res.data.message === "Done") {
                        navagite('/teacherAdmin/allVideos');
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
    // FUNCTION HANDLE IMAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
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
                    <div className=" mb-4">
                        <label className="py-3" htmlFor="image">برجاء اختيار صورة جديدة</label>
                        <input placeholder=" ادخل الصورة" type="file" className="w-100 p-2" name="image" onChange={handleImageChange} />
                        {isSubmit ? <>
                            {!image ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            {image ? !validExtensions.includes(image?.type) ? <p className="small fw-medium  py-2 text-end text-danger">هذا الامتداد غير صحيح</p> : "" : ""}
                        </> : ""}
                    </div>
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
                    {errorForm.length > 0 ? <p className="text-danger py-1 text-center small">لديك مشكلة في التعديل </p> : ''}
                </form>

            </div>
        </div>

    </>
}