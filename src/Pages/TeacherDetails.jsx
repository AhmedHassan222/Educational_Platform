import { Link, useParams } from "react-router-dom"
import mr from "../../src/Assets/Images/download.jpg"
import mrs from "../../src/Assets/Images/women.jpg"
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import { useEffect, useState } from "react";
import axios from "axios";
export default function TeacherDetails() {
    let { id } = useParams();
    const arr = [1]
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [teacherDetails, setteacherDetails] = useState([]);
    const stage = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };

    async function getteacherDetailsById() {
        const { data } = await axios.get(`${baseURL}/auth/teachers?_id=${id}`);
        setteacherDetails(data.data)
    }
    useEffect(() => {
        getteacherDetailsById();
    }, [teacherDetails?.length])
    const classes = [1, 2, 3, 4, 5]
    return <>
        <div className="container py-5">
            <div className="row g-3">
                {teacherDetails?.length > 0 ?   teacherDetails.map((item, index) => <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                    <div className="text-center rounded-5 border-1 border border-muted p-5">
                        <img src={item.image || item.gender == "male" ? mr : mrs} alt="mr image" className="w-25" />
                        <p className="bg-light  my-4" > {item.courseId?.name ? item.courseId.name : "لا يوجد"}  </p>
                        <h3 > {item.fullName} </h3>
                        <p className="text-muted fs-6">
                            روابط التواصل
                        </p>
                        <div >
                            <table className="text-end">
                                <tbody >
                                    <tr>
                                        <td> <i className="fa-brands fa-whatsapp fs-5 mx-2"> </i>: {item.phoneNumber.replace("+2", "")}</td>
                                    </tr>
                                    <tr>
                                        <td> <i className="fa-solid fa-envelope fs-5 mx-2"></i>: {item.email}</td>
                                    </tr>
                                    <tr>
                                        <td> <i className="fa-solid fa-phone fs-5 mx-2"></i>: {item.phoneNumber.replace("+2", "")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>): arr.map(( index) => <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                    <div className="text-center rounded-5 border-1 border border-muted p-5">
                        <img src={fakeImage} alt="mr image" className="w-50" />
                        <p className=" placeholder col-8  my-4" >  </p>
                        <p className="text-muted fs-6 placeholder col-8">
                            
                        </p>
                        <div className="text-end my-4" >
                        <p className="text-muted fs-6 placeholder col-8">  </p>
                        <p className="text-muted fs-6 placeholder col-8">  </p>
                        <p className="text-muted fs-6 placeholder col-8">  </p>

                        </div>
                    </div>
                </div>)}
              {teacherDetails?.length > 0 ? teacherDetails.map((item, index) => <div key={index} className="col-sm-12 col-md-6 col-lg-4 text-center">
                    <div className='border-1 border border-muted rounded-3'>
                        <Link to={`/cources/${item.courseId?.id}`}>
                            <img src={item.image || item.gender == "male" ? mr : mrs} alt="teacher image" className='w-100' />
                        </Link>
                        <div className="p-3">
                            <p className="text-muted my-2"> المرحلة {stage[item.stage]} 2025  </p>
                        </div>
                    </div>
                </div>) : arr.map(( index) => <div key={index} className="col-sm-12 col-md-6 col-lg-4  mt-5 text-center">
                    <div className='border-1 border border-muted rounded-3'>
                        <Link to={``}>
                            <img src={fakeImage} alt="teacher image" className='w-100' />
                        </Link>
                        <div className="p-3">
                        <p className="text-muted fs-6 placeholder col-8">  </p>
                        </div>
                    </div>
                </div>)}
            
            </div>
        </div >
    </>
}