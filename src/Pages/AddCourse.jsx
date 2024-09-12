import { useState, useContext, useEffect } from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function AddCourse() {
    // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const navigate = useNavigate()
    const [error, setError] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const [subcategoryId, setSubCategoryId] = useState(null);
    const [subCategories, setSupCategories] = useState([])
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const [name, setName] = useState({ name: "" });
    const [image, setImage] = useState(null);
    const [Isloading, setIsloading] = useState(false);
    const formData = new FormData();
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION HANDLE IMAGE >>
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
  };
    // FUNCTION  GET ALL SUB  CATEGORIES >>
    async function getAll() {
        const { data } = await axios.get(`${baseURL}/subcategory/`);
        setSupCategories(data.Subcategories)
    }

    useEffect(() => {
        getAll();
    }, [])
    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   
    const validationForm = () => {
        let schema = Joi.object({
            image: Joi.array(),
            name: Joi.string().required(),
        });
        return schema.validate(formData, { abortEarly: false });
    };
    const handleSubmit = (e) => {
        setIsloading(true)
        e.preventDefault();
        // const validate = validationForm();
        // if (validate.error) {
        //     setError(validate.error.details)
        // } else {
        //     addItem()
        // }
        // setIsloading(false)
        // console.log(error)
        addItem();
    };
    async function addItem() {
        formData.append("image",image);
        formData.append("name",name);
        try {
            await axios.post(`${baseURL}/course/create?subCategoryId=${subcategoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": `online__${Cookies.get('token')}`
                }
            }).then((res) => {
                console.log(res)
                // navigate('/admin/allCources')
            })
        } catch (error) {
            console.log(error)
            // seterrorForm(error)
        }
    }
    return <>
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType='multibart/form-data' onSubmit={handleSubmit}>
                    <div className=" mb-4">
                        <input
                            placeholder=" اضف صورة "
                            type="file"
                            className="w-100 p-2"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className=" mb-4">
                        <input
                            placeholder=" اضف  عنوانا للكورس "
                            type="text"
                            className="w-100 p-2"
                            id="name"
                            name="name"
                            value={name.name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <select className="w-100 p-2 text-muted" id="name" name="name" onChange={(e) => setSubCategoryId(e.target.value)}  >
                            <option value="">  المرحلة الدراسية </option>
                            {subCategories.map((subCategory, index) => { <option key={index} value={subCategory.id}>{grade[subCategory.name]}</option> })}
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "name" ? <div key={index}>
                                {!formData.name ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div>
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> اضف</button>
                </form>
            </div>
        </div>
    </>
}
