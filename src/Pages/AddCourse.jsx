
import { useState } from "react";

import style from "../../src/Styles/Auth.module.css"
export default function AddCourse() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        class: '',
        phoneNumber: '',
        parentsPhoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation and submission logic here
        console.log(formData);
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
