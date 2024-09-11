import { useContext, useState } from "react";
import Cookies from 'js-cookie';
import style from "../../src/Styles/Auth.module.css"
import { useNavigate } from "react-router-dom";
import { CRUDContext } from "../Contexts/CRUDContext";
import Joi from "joi";
import axios from "axios";
export default function AddTeacher() {
    let navigate =useNavigate()
    const [error, setError] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const {baseURL}=useContext(CRUDContext)
    const [dataAdded, setdataAdded] = useState({
        img:"",
        fullname:"",
        material:"",
        phone:""
    });
    const [Isloading, setIsloading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdataAdded({
            ...dataAdded,
            [name]: value,
        });
    };
    const validationForm = () => {
        let schema = Joi.object({
            name: Joi.string().required(),
        });
        return schema.validate(dataAdded, { abortEarly: false });
    };
    const handleSubmit = (e) => {
        setIsloading(true)
        e.preventDefault();
        const validate = validationForm();
        if(validate.error){
            setError(validate.error.details) 
        }else{
            addTeacher()
        }
        setIsloading(false)
        console.log(error)
    };
    async function addTeacher() {
        try {
         await axios.post(`${baseURL}/category/create`, dataAdded, {
             headers: {
                 "token": `online__${Cookies.get('token')}`
             }
         }).then((res)=>{
             console.log(res)
             navigate('/admin/allCategories')
         })
        } catch (error) {
         // console.log(error)
         seterrorForm(error)
        }
           
         }
    return <>
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className=" mb-4">
                    <input
                        placeholder=" ادخل الصورة"
                        type="file"
                        className="w-100 p-2"
                        id="fullName"
                        name="fullName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className=" mb-4">
                    <input
                        placeholder=" الاسم بالكامل"
                        type="text"
                        className="w-100 p-2"
                        id="fullName"
                        name="fullName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className=" mb-4">
                    <input
                        placeholder=" المادة"
                        type="text"
                        className="w-100 p-2"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className=" mb-4">
                    <input
                        placeholder="رقم الهاتف"
                        type="text"
                        className="w-100 p-2"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> اضف</button>
            </form>
            </div>
        </div>
    </>
}
