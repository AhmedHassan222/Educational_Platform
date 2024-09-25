import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import style from "../../src/Styles/Auth.module.css";
import fakeImage from "../../src/Assets/Images/fakeImage.png";

export default function WatchVideo() {
  const [lectures, setlectures] = useState([]);
  const [tasks, settasks] = useState([]);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const { id } = useParams();
  const grade = {
    primary: "الابتدائي",
    preparatory: "الاعدادي ",
    secondary: "الثانوي",
  };
  let stage = {
    first: "الصف الاول",
    second: " الصف الثاني",
    third: "الصف الثالث",
    fourth: "الصف الرابع",
    fifth: "الصف الخامس",
    sixth: "الصف السادس",
  };
  const decryptVideoURL = (encryptedURL) => {
    const bytes = CryptoJS.AES.decrypt(encryptedURL, "Gl?11£5R8:5z£-%");
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  async function getLectureById() {
    try {
      const { data } = await axios.get(`${baseURL}/lecture?_id=${id}`);
      setlectures(data.data);
      console.log(lectures);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAssignment() {
    try {
      const { data } = await axios.get(`${baseURL}/assignment?lectureId=${id}`);
      settasks(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getLectureById();
    getAssignment();
    //    document.addEventListener('contextmenu', (e) => e.preventDefault());
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
  }, [lectures?.length, tasks?.length]);
  return (
    <>
      <div className="container py-5">
        {lectures?.length > 0 ? (
          lectures.map((item, index) => {
            const decryptedURL = decryptVideoURL(item.videoURL);
            return (
              <div key={index}>
                <iframe
                  width="100%"
                  height="400"
                  src={`${decryptedURL}?modestbranding=1&rel=0&showinfo=0&disabledkb=1`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
                <div className="my-2">
                  <h2 className="my-3"> {item?.title}</h2>
                  <div className="mt-3 mb-1 fs-5">
                    <span>{item?.courseId.name} -</span>
                    <span>
                      {" "}
                      {stage[item?.subCategoryId?.name]}{" "}
                      {grade[item?.categoryId?.name]}{" "}
                    </span>
                  </div>
                  <p className="fs-5">استاذ/ {item?.teacher?.fullName}</p>

                  <button
                    className={` my-2 py-2 px-4 border-0 rounded-2 ${style.btnOrange}  `}
                  >
                    <Link
                      to={tasks[0]?.pdf?.secure_url}
                      className=" text-white"
                      download={`${tasks[0]?.title}.pdf`}
                    >
                      تحميل الواجب{" "}
                    </Link>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div  >
            <img src={fakeImage} className="w-100 " alt="loading fake image" />
            <div className="my-4">
              <span className="placeholder col-6 "></span>
              <div className="mt-3 mb-1 fs-5">
                <span className="placeholder col-7"></span>
              </div>
              <span className="placeholder col-4 "></span>
             <br />
              <button
                type="submit"
                className={` my-4 px-5 py-2 border-0 rounded-2 ${style.btnOrange}  `}
              >
                <span className="w-100 p-3 text-white "> </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
{
  /* <video controls autoPlay   width="600">
                <source src={"https://www.tiktok.com/@bbclearningenglish/video/7274977134207077665"} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */
}
