import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateCourse() {
    // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const { id,nameCourse } = useParams()
    let navagite = useNavigate()
    const formData = new FormData();
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [Isloading, setIsloading] = useState(false);
    const [errorForm, seterrorForm] = useState("");
    const [image, setImage] = useState(null);
    const [name, setName] = useState(nameCourse);
    const [isSubmit, setIsSubmit] = useState(false);
    const validExtensions = ["image/png", "image/jpeg", "image/gif"];
    // UPDATE COURSE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function updateItem() {
        setIsloading(true);
        // HANDLE FORM DATA >>
        formData.append("image", image);
        formData.append("name", name); 
        try {
            await axios
                .put(`${baseURL}/course/update?courseId=${id}`, formData, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
                .then((res) => {
                    setIsloading(false);
                    if (res.status === 200) {
                        navagite('/admin/allCources')
                    }
                });
        } catch (error) {
            setIsloading(false);
            seterrorForm(error.message)
        }
    }
    // HANDLE IMAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
    };
    // SUBMIT FORM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleSubmit = (e) => {
        setIsSubmit(true)
        e.preventDefault();
        updateItem();
    };
    // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className=" mb-4 text-end">
                        <label className="py-3" htmlFor="image">برجاء اختيار صورة جديدة</label>
                        <input placeholder=" اضف صورة " id="image" type="file" className="w-100 p-2" name="image" onChange={handleImageChange} />
                        {isSubmit ? <>
                            {!image ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            {  !validExtensions.includes(image?.type) ? <p className="small fw-medium  py-2 text-end text-danger">هذا الامتداد غير صحيح</p> : "" }
                        </> : ""}
                    </div>
                    <div className=" mb-4">
                        <input autoComplete="off" placeholder=" اضف  عنوانا للكورس " type="text" className="w-100 p-2" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        {isSubmit ? name === "" ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : "" : ""}
                    </div>
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa fa-spin fa-spinner"></i> : "حفظ"}</button>
                    {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في تعديل الكورس</p> : ''}
                </form>
            </div>
        </div>
    </>;
}
