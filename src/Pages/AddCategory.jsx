import {  useState } from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function AddCategory() {
    let navigate = useNavigate()
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [error, setError] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const [dataAdded, setdataAdded] = useState({
        name: "",
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
        if (validate.error) {
            setError(validate.error.details)
        } else {
            addItem()
        }
        setIsloading(false)
        console.log(error)
    };
    async function addItem() {
        try {
            await axios.post(`${baseURL}/category/create`, dataAdded, {
                headers: {
                    "token": `online__${Cookies.get('token')}`
                }
            }).then((res) => {
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

                        <select className="w-100 p-2 text-muted" autoComplete="off" id="name" name="name" value={dataAdded.name} onChange={handleChange}  >
                            <option value="">المرحلة </option>
                            <option value="primary">الابتدائية</option>
                            <option value="preparatory">الاعدادية </option>
                            <option value="secondary">الثانوية </option>
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "name" ? <div key={index}>
                                {!dataAdded.name ? <p className="small fw-medium py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>

                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}>    {Isloading ? <i className="fa-spin fa fa-spinner"></i> : "اضف"}</button>
                    {errorForm ? <p className="text-danger my-4 text-center small">لديك مشكلة في اضافة فئة</p> : ''}
                </form>
            </div>
        </div>
    </>
}
