
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import moment from "moment";

export default function GetAllCources() {
    let arr = [1, 2, 3, 4];
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [Courses, setCourses] = useState([]);
    const [errorForm, seterrorForm] = useState("");
    let stage = {
        first: "الصف الاول",
        second: " الصف الثاني",
        third: "الصف الثالث",
        fourth: "الصف الرابع",
        fifth: "الصف الخامس",
        sixth: "الصف السادس"
    };
    let grade = {
        primary: "الابتدائي",
        preparatory: "الاعدادي ",
        secondary: "الثانوي",
    };
    let date = new Date();
    async function getAll() {
        const { data } = await axios.get(`${baseURL}/course`);
        setCourses(data.courses)
        console.log(data.courses)
    }

    async function deleteItem(id) {
        try {
            await axios
                .delete(`${baseURL}/course/delete?courseId=${id}`, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
        } catch (error) {
            console.log(error);
            seterrorForm(error.message)
        }

    }

    useEffect(() => {
        getAll();
    }, [Courses]);

    return (
        <>
            <div className="container py-5">
                <table className="table table-striped text-center  table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="py-3" scope="col">
                                #
                            </th>
                            <th className="py-3" scope="col">
                                صورة الكورس
                            </th>
                            <th className="py-3" scope="col">
                                عنوان الكورس
                            </th>
                            <th className="py-3" scope="col">
                                تابع الي
                            </th>
                            <th className="py-3" scope="col">
                                تاريخ الانشاء
                            </th>
                            <th className="py-3" scope="col">
                                المعاملات{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Courses?.length > 0
                            ? Courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="pt-3" >{index + 1}</td>
                                    <td className="col-2"><img src={item.photo.secure_url} className="w-100" alt={item.name} /></td>
                                    <td className="pt-3" >{item.name}</td>
                                    <td className="pt-3" >{stage[item.subCategoryId.name]} {grade[item.categoryId.name]}</td>
                                    <td className="pt-3">{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                                    <td className="pt-3">
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => { deleteItem(item._id) }}
                                        >
                                            حذف
                                        </button>
                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/admin/updatecourse/${item.name}/${item.id}`}
                                        >
                                            تعديل
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            : arr.map((item, index) => (
                                <tr key={index}>
                                    <th className="placeholder-glow   p-3"></th>
                                    <td className="placeholder-glow   p-3"></td>
                                    <td className="placeholder-glow   p-3"></td>
                                    <td className="placeholder-glow   p-3"></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {errorForm ? <p className="text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
            </div>
        </>
    );
}
