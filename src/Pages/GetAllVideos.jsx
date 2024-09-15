import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";
import moment from "moment";
import Cookies from 'js-cookie';
export default function GetAllVideos() {

    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [lectures, setlectures] = useState([]);
    const [errorForm, seterrorForm] = useState("");

    let arr = [1, 2, 3, 4];

    // Function to decrypt text
    function decryptText(encryptedText) {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, "secretKey");
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

            // Ensure decryptedText is valid UTF-8
            if (!decryptedText) {
                console.log("Malformed UTF-8 data")
            }

            return decryptedText;
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    }
    async function deleteItem(id) {
        try {
            await axios
                .delete(`${baseURL}/lecture/delete?lectureId=${id}`, {
                    headers: {
                        token: `online__${Cookies.get("token")}`,
                    },
                })
        } catch (error) {
            seterrorForm(error.message)
        }

    }
    const decryptVideoURl = (encrypted) => {
        const bytes = CryptoJS.AES.decrypt(encrypted, "secretKey");
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    async function getAllLecture() {
        const { data } = await axios.get(`${baseURL}/lecture`);
        setlectures(data.data)
    }
    useEffect(() => {
        getAllLecture()
    }, [lectures])
    return <>
        <section className="py-5 container ">
            {errorForm ? <p className="text-danger py-1 text-center small">لديك مشكلة في  اخر عملية</p> : ''}
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
                            تاريخ الانشاء
                        </th>
                        <th className="py-3" scope="col">
                            المعاملات{" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lectures?.length > 0
                        ? lectures.map((item, index) => (
                            <tr key={index}>
                                <td className="pt-3" >{index + 1}</td>
                                <td className="col-2"><img src={item.photo.secure_url} className="w-100" alt={item.name} /></td>
                                {/* decryptText(item.videoURL) */}
                                <td className="pt-3" > <Link to={``} target='_blank'>{item.title}</Link> </td>
                                <td className="pt-3">{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                                <td className="pt-3">
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => { deleteItem(item._id) }} >حذف  </button>
                                    <Link className="btn btn-primary btn-sm" to={`/teacherAdmin/updateVideos/${item.title}/${item._id}`} >  تعديل  </Link>
                                </td>
                            </tr>
                        ))
                        : arr.map((item, index) => (
                            <tr key={index}>
                                <th className="placeholder-glow   p-4"></th>
                                <td className="placeholder-glow   p-4"></td>
                                <td className="placeholder-glow   p-4"></td>
                                <td className="placeholder-glow   p-4"></td>
                                <td className="placeholder-glow   p-4"></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    </>
}