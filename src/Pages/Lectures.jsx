import React, { useEffect, useState } from 'react'
import fakeImage from "../../src/Assets/Images/fakeImage.png"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import CryptoJS from 'crypto-js';
export default function Lectures() {
    let arr=[1,2,3]
    let {id}=useParams();
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [lectures, setlectures] = useState([]);
    const decryptVideoURL = (encryptedURL) => {
      const bytes = CryptoJS.AES.decrypt(encryptedURL, "Gl?11£5R8:5z£-%");
      return bytes.toString(CryptoJS.enc.Utf8);
    };


    async function getCoursesDetailsById() {
      try {
        const { data } = await axios.get(`${baseURL}/lecture?courseId=${id}`);
        setlectures(data.data);
      } catch (error) {
        
      }
    
  }

    useEffect(() => {
      getCoursesDetailsById()
 
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
    }, [lectures?.length])
    


// alkymXGYZ8 alkymB4PKU alkymRRFOE alkym1LLRY alkymZ0PKZ
  return (
    <div className="container p-5"> 
      <div className="row gy-4">
         { lectures.length > 0 ? lectures.map((lecture, index) => {
            const decryptedURL = decryptVideoURL(lecture.videoURL);
            return (
              
              <div key={index} className='col-md-4'>
                <div className='shadow p-2'>
                  <iframe
                 width="100%" height="400"
                    src={`${decryptedURL}`} 
                  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                ></iframe>
                  <div className='d-flex justify-content-center align-items-center my-2'>
                    <i className="fa-solid fa-play ms-1 fs-4 text-danger small"></i>
                    <p className='my-2 lead'>المحاضرة {index + 1}</p>
                  </div>
                </div>
              </div>
            );
          }) : (
            // Handle case when no lectures are available
            <div className='col-md-4'>
              <div className='shadow p-2'>
                <iframe
                  width={"100%"}
                  height={"350px"}
                  src={fakeImage}
                  scrolling="no"
                ></iframe>
                <div className='d-flex justify-content-center align-items-center my-2'>
                  <p className='my-2 lead placeholder col-6'></p>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

