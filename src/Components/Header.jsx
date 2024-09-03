import teacher from "./../../src/Assets/Images/teacher.jpg";
import feature1 from "./../../src/Assets/Images/feature-1.a3c9fc1.svg";
import feature2 from "./../../src/Assets/Images/feature-2.3cb2b9c.svg";
import feature3 from "./../../src/Assets/Images/feature-3.89f5be4.svg";
import feature4 from "./../../src/Assets/Images/feature-4.200709f.svg";
import feature5 from "./../../src/Assets/Images/feature-5.173caa5.svg";
import feature6 from "./../../src/Assets/Images/feature-6.d23de85.svg";
import logo from "./../../src/Assets/Images/logo.png";
import style from "../../src/Styles/Header.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Cookies from "js-cookie";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { jwtDecode } from "jwt-decode";

// import './styles.css';
export default function Header() {
  const [Classes, setClasses] = useState([1, 2, 3, 4, 5, 6]);
  const [role , setRole] = useState(null)
  useEffect(()=>{
    if(Cookies.get('token'))
      setRole(jwtDecode(Cookies.get('token'))?.role)
  },[Cookies.get('token')])

  return (
    <>
      <header className="w-100 text-center d-flex  justify-content-center align-items-center">
        <div className={`${style.headerContent} my-4`}>
          <div >
            <img src={logo} className="w-25" alt="sky academy logo" />

            <h1 className="mb-4 "> سكاي اونلاين اكاديمي </h1>
            <p className="  w-md-50 mx-auto">
              ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓإﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
              اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ الإعدادية والثانوية, ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
            </p>
            {role === "User" ? <Link className={`nav-link text-white rounded-2 fitContent mx-auto my-2 text-center py-2 px-4 ${style.btnOrange}`} to={'/cources'}>تصفح الكورسات </Link>
              : ""}
          </div>
        </div>
      </header>
      <section className="my-5 py-5 text-center">
        <div className="container">
          <h3 className="mb-3 h4">
            اﺳﺘﻜﺸﻒ ﻣﻮاد اﻟﺼﻔﻮف اﻟﺘﻌﻠﻴﻤﻴﺔ اﻟﻤﻮﺟﻮدة ﺑﺎﻟﻤﻨﺼﺔ{" "}
          </h3>
          <p className="mb-5 h5">
            ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
            اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ اﻟﺜﺎﻧﻮﻳﺔ واﻟﺠﺎﻣﻌﻴﺔ , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
          </p>
          <div className="row gy-4">
            {Classes.map((item, index) => (<div key={index} className="col-md-4">
              <div className=" border border-1 border-muted  p-3 rounded">
                <h4 className="h6"> اﻟﺼﻒ اﻟﺄول اﻟﺜﺎﻧﻮى </h4>
              </div>
            </div>))}
          </div>
        </div>
      </section>

      <section className="text-center my-5 py-5">
        <div className="container">
          <h3 className="mb-3 h4">ﺗﻤﺘﻊ ﺑﺄﻓﻀﻞ اﻟﻄﺮق اﻟﺘﻌﻠﻴﻤﻴﺔ ﻣﻦ ﺧﻠﺎل اﻟﻤﻨﺼﺔ</h3>
          <p className="h6 mb-5">
            ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
            اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ اﻟﺜﺎﻧﻮﻳﺔ واﻟﺠﺎﻣﻌﻴﺔ , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
          </p>

          <div className="row g-3">
            <div className="col-md-4 ">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5">ﻛﻮرﺳﺎت ﻣﻤﻴﺰة </h4>
                <img src={feature1} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted ">
                  نعمل جاهدين على توفير كافة المواد على المنصة ومن أكثر من مدرس
                  لتتمكنوا من حضور الدرس مع المدرس المفضل لديكم
                </p>
              </div>
            </div>
            <div className="col-md-4 my-4">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4">ﻓﻴﺪﻳﻮﻫﺎت ﻋﺎﻟﻴﺔ اﻟﺠﻮدة
                </h4>
                <img src={feature2} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted ">
                  نعمل على إنتاج محتوى عالي الجودة في استديوهاتنا المتخصصة لأجل
                  ضمان عملية تعليمية مريحة خالية من الشوائب
                </p>
                <br />
              </div>
            </div>
            <div className="col-md-4 my-4">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4">اﺧﺘﺒﺎرات و واﺟﺒﺎت                </h4>
                <img src={feature3} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted">
                  يتم تصميم الأسئلة والواجبات بعناية لضمان المستوى التعليمي لأبنائنا من الطلاب
                </p>
                <br />
                <br />
              </div>
            </div>
            <div className="col-md-4 my-4">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4">ﺑﻨﻚ اﺳﺄﻟﺔ
                </h4>
                <img src={feature4} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted">
                  لن تحتاج إلى أي من الكتب الخارجية, لاننا نقوم بتحديث بنك الاسئلة الخاص بنا دوريا بالتعاون مع نخبة من أكبر مدرسين المواد في الجمهورية

                </p>

              </div>
            </div>
            <div className="col-md-4 my-4">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4">ﺗﻘﻴﻴﻢ ﻣﺴﺘﻤﺮ
                </h4>
                <img src={feature5} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted mt-4">
                  هدفنا طمانتكم ولذلك يقوم فريق كامل من المساعدين بمتابعة مستوى أبنائنا مع أولياء الأمور

                </p>

                <br />
                <br />
              </div>
            </div>
            <div className="col-md-4 my-4">
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4">تفاعلات                </h4>
                <img src={feature6} className="w-25 my-2" alt="" />
                <p className="p-2 small text-muted">
                  ابنائنا الطلبة, يهمنا رايكم ولذلك يمكنكم ارسال ارائكم واستفساراتكم على أي جزء خاص في المنصة سواء كان على الواجبات والامتحانات أو حتى عن المنصة

                </p>
                <br />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* swiper */}
      <section className="my-5 text-center ">
        <div className="container">
          <div className="my-5">
            <h3 className="mb-3">ﻧﺨﺒﺔ ﻣﻦ اﻓﻀﻞ ﻣﺪرﺳﻴﻦ اﻟﺜﺎﻧﻮﻳﺔ اﻟﻌﺎﻣﺔ</h3>
            <p>
              ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎن ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
              اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ اﻟﺜﺎﻧﻮﻳﺔ واﻟﺠﺎﻣﻌﻴﺔ , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ..
            </p>
          </div>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={5}
            spaceBetween={10}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              786: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {Classes.map((item, index) => (
              <SwiperSlide key={index}>
                <div className=" py-2 itemSlide">
                  <img src={teacher} className="w-75  rounded-circle " alt="" />
                  <h4 className="my-4 h6">أ/ سيد عبد الرحيم</h4>
                  <p className="my-4 small text-primary">
                    <span className="bg-light text-black p-2 rounded">
                      كيمياء
                    </span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
