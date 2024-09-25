import React, { useEffect, useState } from "react";
import fakeImage from "../../src/Assets/Images/fakeImage.png";
import { Link, useParams } from "react-router-dom";
import style from "../../src/Styles/Auth.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export default function Lectures() {
  // VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  let arr = [1, 2, 3];
  let { id } = useParams();
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [lectures, setlectures] = useState([]);
  // GET ALL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function getAll() {
    try {
      const { data } = await axios.get(`${baseURL}/lecture?courseId=${id}`);
      setlectures(data.data);
    } catch (error) {
      toast.error(" هناك مشكلةة في عرض المحاضرات   ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }
  }
  // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    getAll();
  }, [lectures?.length]);
  // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <>
      <ToastContainer />
      <div className="container py-5">
        <div className="row g-3 mt-1">
          {lectures?.length > 0
            ? lectures?.map((item, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-4">
                <div className="border-1 p-3 border border-muted rounded-3">
                  <img src={item.photo.secure_url} alt="teacher image" className="w-100" />
                  <h3 className="h5 my-4">{item?.title} </h3>
                  <button type="submit" className={` my-2 p-2 border-0 rounded-2 ${style.btnOrange}   w-100 `} >
                    <Link to={`/watch/${item._id}`} className="w-100 p-3 text-white ">
                      {" "}
                      مشاهدة
                    </Link>
                  </button>
                </div>
              </div>
            ))
            : arr.map((item, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-4">
                <div className="card" aria-hidden="true">
                  <img src={fakeImage} className="card-img-top w-100" alt="Loading Image" />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <button type="submit" className={` my-4 p-2 border-0 rounded-2 ${style.btnOrange}   w-100 `}  >
                        <span className="w-100 p-3 text-white "> </span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
