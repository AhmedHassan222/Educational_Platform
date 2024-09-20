import image from "../Assets/Images/default-avatar.png";
import Styles from "../Styles/Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export default function Profile() {
  let navigate = useNavigate();
  const [userDetails, setuserDetails] = useState([]);
  const [errorForm, seterrorForm] = useState("");
  const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي", };
  const stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };

  function logOut() {
    Cookies.remove('token');
    navigate('/login')

  }
  async function getAllUserById(id) {
    try {
      const { data } = await axios.get(`https://ahmed-shaltout-platform.up.railway.app/auth/teachers?role=User&_id=${id}`);
      if (Array.isArray(data)) {
        setuserDetails(data);

      } else {
        setuserDetails(data.data);
      }
    } catch (error) {
      seterrorForm(error.message)
    }

  }
  useEffect(() => {
    let user;
    if (Cookies.get('token')) {
      user = jwtDecode(Cookies.get('token'))
      getAllUserById(user._id)
    }
  }, [userDetails?.length])

  return (
    <>
      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-between  ">
          <h3 >الملف الشخصي </h3>

          <div className="d-flex align-items-center w-50 justify-content-end  text-start">
            <i className="fa-regular fa-bell fs-2 "></i>

            <img
              src={image}
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className={`${Styles.defaultImg}  rounded-circle mx-2`}
              alt="default image "
            />
            <ul
              className="dropdown-menu w-25 text-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="p-2">
                <Link className="dropdown-item " to={"/profile"}>
                  <img
                    src={image}
                    className={`${Styles.defaultDrop} rounded-circle mx-2`}
                    alt="default image dropDown"
                  />
                  <span>الملف الشخصي </span>
                </Link>
              </li>
              <li className="p-2">
                <Link
                  className="dropdown-item d-flex justify-content-start"
                  to={""}
                >
                  <i className="fa-solid fa-question fs-3 mx-2"></i>
                  <span>المساعدة </span>
                </Link>
              </li>
              <li className="p-2">
                <div onClick={logOut} className="dropdown-item d-flex justify-content-start  " >
                  <i className="fa-solid fa-right-from-bracket fs-4 mx-2 "></i>
                  <span>تسجيل الخروج </span>
                </div>
              </li>
            </ul>
          </div>
        </div>


        {Array.isArray(userDetails) && userDetails.length > 0 ?

          <div>
            <div className="row border my-4 border-1 p-2 border-muted">
              <div className="col-md-1">
                <img src={image} className={` w-100 `} alt="default image" />
              </div>
              <div className="col-md-6">
                <div className="p-2">
                  <h4> {userDetails[0].fullName}</h4>
                  <p className="text-muted">{stage[userDetails[0].grade]} {grade[userDetails[0].stage]}</p>

                </div>
              </div>
            </div>
            <div className="p-3 border-1 border border-muted">
              <div className="d-flex">
                <i className="fa-regular fa-user fs-5 ms-5"></i>
                <div>
                  <p className="text-muted h5">معرف الطالب</p>
                  <p>{userDetails[0].fullName}</p>

                </div>
              </div>
            </div>
            <div className="p-3 border-1 border border-muted">
              <div className="d-flex">
                <i className="fa-regular fa-envelope fs-5 ms-5"></i>
                <div className="">
                  <p className="text-muted h5">  البريد الإلكتروني  </p>
                  <p>{userDetails[0].email} </p>
                </div>
              </div>
            </div>
            <div className="p-3 border-1 border border-muted">
              <div className="d-flex">
                <i className="fa-regular fa-phone fs-5 ms-5"></i>
                <div className="">
                  <p className="text-muted h5">رقم الهاتف </p>
                  <p>{userDetails[0].phoneNumber.replace("+2", "")}</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-1 border border-muted">
              <div className="d-flex">
                <i className="fa-regular fa-graduation-cap fs-5 ms-5"></i>
                <div className="">
                  <p className="text-muted h5"> الصف الدراسي</p>
                  <p>{stage[userDetails[0].grade]} {grade[userDetails[0].stage]}</p>
                </div>
              </div>
            </div>

          </div>

          : (
            <div className="text-center">
              <i className="fa fa-spin fa-spinner fs-3"></i>
            </div>
          )}








      </div>
      {errorForm.length > 0 ? <p className=" text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}

    </>
  );
}
