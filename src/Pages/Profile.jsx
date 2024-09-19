import image from "../Assets/Images/default-avatar.png";
import Styles from "../Styles/Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export default function Profile() {
  let navigate = useNavigate();
  const [user, setuser] = useState("")
  const [userDetails, setuserDetails] = useState([]);

  function logOut(){
    Cookies.remove('token');
    navigate('/login')
    // window.location.reload();
  }
  async function getAllUserById() {
    try {
      const { data } = await axios.get(`https://ahmed-shaltout-platform.up.railway.app/auth/teachers?role=User&_id=${user._id}`);
      setuserDetails(data)
    } catch (error) {
      console.log(error)
    }
   
}
  useEffect(() => {
    if (Cookies.get('token')){
        setuser(jwtDecode(Cookies.get('token')))
        getAllUserById()
    }
  }, [user?.length])
  
  return (
    <>
      <div className="container py-5">
        { userDetails.length >0 ?  userDetails.map((userItem,index)=> {
          <div key={index}>
            <p>{userItem.fullName}</p>
            <p>{userItem.email}</p>
            <p>{userItem.phoneNumber}</p>
          </div>}
        ) : ""}
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
        <div className="row border my-4 border-1 p-2 border-muted">
          <div className="col-md-1">
            <img src={image} className={` w-100 `} alt="default image" />
          </div>
          <div className="col-md-6">
            <div className="p-2">
              <h4>{user?.fullName} </h4>
            </div>
          </div>
          <div className="col-md-5">
            <button className="btn text-danger  d-flex align-items-center justify-content-center  btn-transparent ">
              <i className="fa-regular fa-image fs-5 mx-2"></i>
              <input
                type="file"
                accept="image/*"
                className=" w-100 p-2"
                placeholder="تعديل الصورة الشخصية"
                name=""
                id=""
              />
            </button>
          </div>
        </div>
        <div className="p-3 border-1 border border-muted">
          <div className="d-flex">
            <i className="fa-regular fa-user fs-5 ms-5"></i>
            <div className="">
              <p className="text-muted h5">معرف الطالب</p>
              <p >{user.fullName}</p>
            </div>
          </div>
        </div>

        <div className="p-3 border-1 border border-muted">
          <div className="d-flex">
            <i className="fa-regular fa-envelope fs-5 ms-5"></i>
            <div className="">
              <p className="text-muted h5">  البريد الإلكتروني  </p>
              <p>{user.email} </p>
            </div>
          </div>
        </div>

        <div className="p-3 border-1 border border-muted">
          <div className="d-flex">
            <i className="fa-regular fa-phone fs-5 ms-5"></i>
            <div className="">
              <p className="text-muted h5">رقم الهاتف </p>
              <p>+2001202499898</p>
            </div>
          </div>
        </div>

        <div className="p-3 border-1 border border-muted">
          <div className="d-flex">
            <i className="fa-regular fa-graduation-cap fs-5 ms-5"></i>
            <div className="">
              <p className="text-muted h5"> الصف الدراسي</p>
              <p>level (2) - Helwan university</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
