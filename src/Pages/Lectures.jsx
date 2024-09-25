import React, { useEffect, useState } from "react";
import fakeImage from "../../src/Assets/Images/fakeImage.png";
import { Link, useParams } from "react-router-dom";
import style from "../../src/Styles/Auth.module.css";
import axios from "axios";
export default function Lectures() {
  let arr = [1, 2, 3];
  let { id } = useParams();
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [lectures, setlectures] = useState([]);
  const [errorForm, seterrorForm] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setrecordPerPage] = useState();
  const lastIndex = currentPage * recordPerPage;
  const fristIndex = lastIndex - recordPerPage;

  async function getAll() {
    try {
      const { data } = await axios.get(`${baseURL}/lecture?courseId=${id}`);
      setlectures(data.data);
    } catch (error) {
      console.log(error);
      // seterrorForm(error.message)
    }
  }
  function prePage() {
    setIsloading(true);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getAll(currentPage - 1);
      setIsloading(false);
    }
  }
  function nextPage() {
    setIsloading(true);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getAll(currentPage + 1);
      setIsloading(false);
    }
  }
  useEffect(() => {
    getAll();
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
    //   document.onkeydown = function (e) {                                                     // console                  // View source             // saving
    //     if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||e.ctrlKey && e.shiftKey && e.key === "J" || e.ctrlKey && e.key === "u" ||e.ctrlKey && e.key === "s" ||e.key === "PrintScreen") {
    //       e.preventDefault()
    //       return false;
    //     }
    //   };
    //   return () => {
    //     document.removeEventListener('contextmenu', () => {});
    //     document.onkeydown = null;
    //   };
  }, [lectures?.length]);

  return (
    <>
      <div className="container py-5">
        <div className="row g-3 mt-1">
          {errorForm.length > 0 ? (
            <p className="text-danger py-1 text-center small"> يوجد مشكلة </p>
          ) : (
            ""
          )}
          {lectures?.length > 0
            ? lectures?.map((item, index) => (
                <div key={index} className="col-6 col-sm-6 col-md-4">
                  <div className="border-1 p-3 border border-muted rounded-3">
                    <img
                      src={item.photo.secure_url}
                      alt="teacher image"
                      className="w-100"
                    />

                    <h3 className="h5 my-4">{item?.title} </h3>

                    <button
                      type="submit"
                      className={` my-2 p-2 border-0 rounded-2 ${style.btnOrange}   w-100 `}
                    >
                      <Link
                        to={`/watch/${item._id}`}
                        className="w-100 p-3 text-white "
                      >
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
                    <img
                      src={fakeImage}
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </h5>
                      <p className="card-text placeholder-glow">
                        <button
                          type="submit"
                          className={` my-4 p-2 border-0 rounded-2 ${style.btnOrange}   w-100 `}
                        >
                          <span className="w-100 p-3 text-white "> </span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* paginations */}
      {totalPages > 1 ? (
        <div className=" p-2 text-center d-flex justify-content-center align-items-center">
          <button
            onClick={prePage}
            className="btn btn-primary mx-2"
            disabled={currentPage === 1}
          >
            السابق
          </button>
          <div className="mx-2">الصفحة {currentPage}</div>
          <button
            onClick={nextPage}
            className="btn btn-primary mx-2"
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
