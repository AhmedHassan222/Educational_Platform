import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function GetAllTeachers() {

    const [errorForm, seterrorForm] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const stage = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [allTeachers, setallTeachers] = useState([]);
    const [email, setemail] = useState({email:""})

    async function deleteItem(id, emailTeacher) {
        setIsloading(true);
        
        try {
            await axios.delete(`${baseURL}/auth/deleteTeacher`, {
                headers: {
                    token: `online__${Cookies.get("token")}`,  // Send token in headers
                },
                params: {
                    teacherId: id,  // Send teacherId as query parameter
                },
                data: {
                    email: emailTeacher  // Send email in request body
                }
            })
            
            setIsloading(false);  // Stop loading indicator after the request completes
        } catch (error) {
            seterrorForm(error.message);  // Handle error
            setIsloading(false);  // Stop loading in case of error
        }
    }
    
    async function getAll() {
        const { data } = await axios.get(`${baseURL}/auth/teachers`);
        setallTeachers(data.users)
    }
    useEffect(() => {
        getAll();
    }, [allTeachers]);
    return <>
        <div className="container py-5">
            
        {isLoading ? <div className="bg-white position-fixed start-50 top-50  p-3" style={{ transform: 'translate(-50%, -50%)' }}>
                <i className="fa fa-spin fa-spinner h3"></i>
            </div> : ""}
            <table className="table table-striped  table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">الاسم</th>
                        <th scope="col">الايميل</th>
                        <th scope="col">تابع الي</th>
                        <th scope="col">الرقم التليفون</th>
                        <th scope="col"> حذف </th>
                    </tr>
                </thead>
                <tbody>
                    {allTeachers?.map((item ,index) => <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.courseId.name} - {stage[item.stage]}</td>
                        <td>{item.phoneNumber.replace("+2", "")}</td>
                        <td>
                            <div className="d-flex ">
                            <button className="btn btn-sm btn-danger ms-2" onClick={() => { deleteItem(item._id,item.email) }}>  حذف</button>
                            </div> </td>
                    </tr>
                   )}
                </tbody>

            </table>
            {errorForm.length > 0 ? <p className=" text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
            
        </div>
    </>
}