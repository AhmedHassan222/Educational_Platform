import { useState ,useContext} from "react";
import style from "../../src/Styles/Auth.module.css"
import Cookies from 'js-cookie';
import { CRUDContext } from "../Contexts/CRUDContext";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function AddCourse() {
  

    let navigate =useNavigate()
    const [error, setError] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    const {baseURL}=useContext(CRUDContext)
    const [addCourse, setaddCourse] = useState({
        name:"",
    });
    const [Isloading, setIsloading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaddCourse({
            ...addCourse,
            [name]: value,
        });
    };
    const validationForm = () => {
        let schema = Joi.object({
            name: Joi.string().required(),
        });
        return schema.validate(addCourse, { abortEarly: false });
    };
    const handleSubmit = (e) => {
        setIsloading(true)
        e.preventDefault();
        const validate = validationForm();
        if(validate.error){
            setError(validate.error.details) 
        }else{
            addItem()
        }
        setIsloading(false)
        console.log(error)
    };
    async function addItem() {
   try {
    await axios.post(`${baseURL}/create?subCategoryId=`, addCourse, {
        headers: {
            "token": `online__${Cookies.get('token')}`
        }
    }).then((res)=>{
        console.log(res)
        navigate('/admin/allCources')
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
                        placeholder=" اضف صورة "
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
                        placeholder=" العنوان "
                        type="text"
                        className="w-100 p-2"
                        id="fullName"
                        name="fullName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className=" mb-4">
                    <select className="w-100 p-2" name="category" id="">
                        <option value="thered">الصف الثالث الثانوي</option>
                        <option value="second">الصف الثاني الثانوي</option>
                    </select>
                </div>
              

                <button type="submit" className={`w-100 p-2 border-0 rounded-2 ${style.btnOrange} my-3  w-100 `}> اضف</button>
            </form>
            </div>
        </div>
    </>
}
