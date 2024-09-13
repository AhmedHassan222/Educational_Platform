import axios from "axios";
import Joi from "joi";
import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCourse() {
    const { id } = useParams()
    let navagite = useNavigate()
    const formData = new FormData();
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [Isloading, setIsloading] = useState(false);
    const [error, setError] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const [updateCourse, setupdateCourse] = useState({ name: "" });
    const [image, setImage] = useState(null);
    const [name, setName] = useState({ name: "" });

    async function updateItem() {
        formData.append("image", image);
        formData.append("name", name);
        const validate = validationForm();
        if (validate.error) {
            setError(validate.error.details);
        }
        try {
            await axios
                .put(`${baseURL}/course/update?courseId=${id}`, formData, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        navagite('/admin/allCources')
                    }
                });
        } catch (error) {
            seterrorForm(error.message)
        }
    }
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
    };


    const validationForm = () => {
        let schema = Joi.object({
            name: Joi.string().required(),
        });
        return schema.validate(updateCourse, { abortEarly: false });
    };
    const handleSubmit = (e) => {
        setIsloading(true)
        e.preventDefault();
        updateItem();

        // const validate = validationForm();
        // if (validate.error) {
        //     setError(validate.error.details)
        // } else {
        //     updateItem()
        // }
        // setIsloading(false)
    };

    return <>

        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className=" mb-4">
                        <input
                            placeholder=" اضف صورة "
                            type="file"
                            className="w-100 p-2"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className=" mb-4">
                        <input
                            autoComplete="off"
                            placeholder=" اضف  عنوانا للكورس "
                            type="text"
                            className="w-100 p-2"
                            name="name"
                            value={name.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa fa-spin fa-spinner"></i> : "حفظ"}</button>
                    {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في اضافة فئة</p> : ''}
                </form>
            </div>
        </div>


    </>;
}
