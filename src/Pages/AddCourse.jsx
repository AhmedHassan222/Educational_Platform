import { useState } from "react";
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
    // const [subCategories, setSubCategories] = useState([])
    // const [categories, setCategories] = useState([])
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    const [name, setName] = useState({ name: "" });
    const [image, setImage] = useState(null);
    const [Isloading, setIsloading] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [subcategoryId, setSubCategoryId] = useState(null);
    const [categories, setcategories] = useState([]);
    const formData = new FormData();
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION HANDLE IMAGE >>
    const handleImageChange = (e) => {
        const file = Array.from(e.target.files)[0];
        setImage(file);
    };
    async function getAllCategories() {
        const { data } = await axios.get(`${baseURL}/category`);
        setcategories(data.categories);
    }
    getAllCategories();
    const [subCategoryies, setsubCategoryies] = useState([]);
    async function getAllsubCategoryies() {
        const { data } = await axios.get(`${baseURL}/subcategory`);
        setsubCategoryies(data.Subcategories);
    }
    getAllsubCategoryies();
    // useEffect(() => {
    //     // FUNCTION  GET ALL SUB  CATEGORIES >>
    //     async function getAllSubCategories() {
    //         const { data } = await axios.get(`${baseURL}/subcategory/`);
    //         const { Subcategories } = data;
    //         setSubCategories(Subcategories)
    //     }
    //     // FUNCTION  GET ALL  CATEGORIES >>
    //     async function getAllCategories() {
    //         const { data } = await axios.get(`${baseURL}/category/`);
    //         const { categories } = data;
    //         setCategories(categories)
    //     }
    //     getAllCategories();
    //     getAllSubCategories();
    // }, [])
    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const validationForm = () => {
        let schema = Joi.object({
            image: Joi.array(),
            name: Joi.string().required(),
        });
        return schema.validate(formData, { abortEarly: false });
    };
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // HANDLE SUBMIT FORM >>
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
    // FUNCTION ADD COURSE
    async function addItem() {
        formData.append("image", image);
        formData.append("name", name);
        try {
            await axios.post(`${baseURL}/course/create?categoryId=${categoryId}&subCategoryId=${subcategoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": `online__${Cookies.get('token')}`
                }
            }).then((res) => {
                if (res.data.message === "course created successfuly")
                    navigate('/admin/allCources')
            })
        } catch (error) {
            console.log(error)
            // seterrorForm(error)
        }
    }

    // RENDER HTML >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <div className="container py-5">
            <div className="text-center rounded-4  border-1 widthCustom mx-auto">
                <form encType='multibart/form-data' onSubmit={handleSubmit}>
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
                    <div className="my-4">
                        <select className="w-100 p-2 text-muted" autoComplete="off" name="name" onChange={(e) => setCategoryId(e.target.value)}  >
                            <option value="">  المرحلة الدراسية </option>
                            {categories?.map((category, index) => <option key={index} value={category.id}>{grade[category.name]}</option>)}
                        </select>
                        {/* {error?.map((err, index) =>
                            err.context.label === "name" ? <div key={index}>
                                {!formData.name ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )} */}
                    </div>
                    <div className="my-4">
                        <select className="w-100 p-2 text-muted" autoComplete="off" name="name" onChange={(e) => setSubCategoryId(e.target.value)}  >
                            <option value="">   الصف  الدراسي </option>
                            {subCategoryies?.map((subcategory, index) => <option key={index} value={subcategory._id}>{stage[subcategory.name]}</option>)}
                        </select>
                        {/* {error?.map((err, index) =>
                            err.context.label === "name" ? <div key={index}>
                                {!formData.name ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )} */}
                    </div>
                    {/* <div className="my-4">
                        <select className="w-100 p-2 text-muted" autoComplete="off" name="name" onChange={(e) => setSubCategoryId(e.target.value)}  >
                            <option value="">  الصف الدراسي </option>
                            {subCategories?.map((category, index) => { <option key={index} value={category.id}>{stage[category.name]}</option> })}
                        </select>
                        {error?.map((err, index) =>
                            err.context.label === "name" ? <div key={index}>
                                {!formData.name ? <p className="small fw-medium  py-2 text-end text-danger">لا يمكن ارسال هذا الحقل  فارغا</p> : ""}
                            </div> : ""
                        )}
                    </div> */}
                    <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> اضف</button>
                </form>
            </div >
        </div >
    </>
}
