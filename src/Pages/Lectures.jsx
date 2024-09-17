import React, { useEffect } from 'react'
import teacher from "../../src/Assets/Images/teacher.jpg"

export default function Lectures() {
    let arr=[1,2,3,4]

    useEffect(() => {
      document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.onkeydown = function (e) {                                                     // console                  // View source             // saving 
          if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||e.ctrlKey && e.shiftKey && e.key === "J" || e.ctrlKey && e.key === "u" ||e.ctrlKey && e.key === "s" ||e.key === "PrintScreen") {
            e.preventDefault()
            return false;
          }
        };
        return () => {
          document.removeEventListener('contextmenu', () => {});
          document.onkeydown = null;
        };
    }, [])
    
  return <>
    <div className="container">
        <div className="row gy-2">
            {arr.map((lecture ,index)=>
                    <div key={index} className="col-md-4 ">
                    <div>
                    <iframe   width={"100%"} height={"350px"} src="https://www.youtube.com/embed/AJtOGBHhhKc" title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen ></iframe>
                        <h2>smskskk</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, deleniti!</p>
                    </div>
                    </div>
            )}
         
        
        </div>
    </div>
    
  
  </>
}
