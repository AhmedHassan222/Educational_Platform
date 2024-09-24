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
import mr from "../../src/Assets/Images/download.jpg"
import mrs from "../../src/Assets/Images/women.jpg"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import fakeImage from "../../src/Assets/Images/fakeImage.png";
import { WOW } from 'wowjs';
import 'animate.css/animate.min.css';// import './styles.css';
export default function Header() {
  const [role, setRole] = useState(null)
  const [subcategories, setsubcategories] = useState([]);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [allTeachers, setallTeachers] = useState([]);
  const arr = [1, 2, 3]
  const arr2 = [1, 2, 3, 4, 5, 6]
  let stage = {
    first: "الصف الاول",
    second: " الصف الثاني",
    third: "الصف الثالث",
    fourth: "الصف الرابع",
    fifth: "الصف الخامس",
    sixth: "الصف السادس"
  };
  let grade = {
    primary: "الابتدائي",
    preparatory: "الاعدادي ",
    secondary: "الثانوي",
  };
  async function getAllTeachers() {
    const { data } = await axios.get(`${baseURL}/auth/teachers`);
    setallTeachers(data.data)
  }
  async function getAll() {
    const { data } = await axios.get(`${baseURL}/subcategory`);
    setsubcategories(data.Subcategories);
  }
  useEffect(() => {
    if (Cookies.get('token'))
      setRole(jwtDecode(Cookies.get('token'))?.role)
    getAll()
    getAllTeachers()
  }, [Cookies.get('token')])
  useEffect(() => {
    const wow = new WOW({ live: false });
    wow.init();
    console.log(wow)
  }, []);
  return (
    <>
      <header className="w-100 text-center d-flex  justify-content-center align-items-center">
        <div className={`${style.headerContent} my-4`}>
          <div >
            <img src={logo} className="w-25 wow animate__animated animate__bounceIn" alt="sky academy logo" />

            <h1 className="mb-3 "> الهلال اونلاين  </h1>
            <p className="  w-md-50 mx-auto mb-5">
              ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓإﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
              اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ الابتدائية و الإعدادية والثانوية, ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
            </p>
            {role === "User" ? <Link className={`nav-link text-white rounded-2 fitContent mx-auto my-2 text-center py-3 px-5 ${style.btnOrange}`} to={'/cources'}>تصفح الكورسات </Link>
              : ""}
          </div>
        </div>
      </header>
      <section className="my-5 py-5 text-center">
        <div className="container">
          <h3 className="mb-4 ">
            اﺳﺘﻜﺸﻒ ﻣﻮاد اﻟﺼﻔﻮف اﻟﺘﻌﻠﻴﻤﻴﺔ اﻟﻤﻮﺟﻮدة ﺑﺎﻟﻤﻨﺼﺔ{" "}
          </h3>
          <p className="mb-5 h5 small ">
            ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
            اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ الابتدائية و الإعدادية والثانوية , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
          </p>
          <div className="row gy-4 py-4">
            {subcategories?.length > 0 ? subcategories.map((item, index) => (<div key={index} className="col-md-4 wow animate__animated animate__bounceI">
              <div className=" border border-1 border-muted  p-3 rounded-2">
                <h4 className="h6">{stage[item.name]} {grade[item.categoryId?.name]} </h4>
              </div>
            </div>)) : arr.map((item, index) => (<div key={index} className="col-md-4 wow animate__animated animate__bounceI">
              <div className="card-text placeholder-glow  border border-1 border-muted  p-3 rounded-2">
                <h4 className="placeholder col-7  p-2"> </h4>
              </div>
            </div>))}
          </div>
        </div>
      </section>

      <section className="text-center my-5 py-5">
        <div className="container">
          <h3 className="mb-3 ">ﺗﻤﺘﻊ ﺑﺄﻓﻀﻞ اﻟﻄﺮق اﻟﺘﻌﻠﻴﻤﻴﺔ ﻣﻦ ﺧﻠﺎل اﻟﻤﻨﺼﺔ</h3>
          <p className="h6 mb-5 mt-4">
            ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎ ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
            اﻟﺨﺎﺻﺔ ﺑﺎﻟﻤﺮﺣﻠﺔ اﻟﺜﺎﻧﻮﻳﺔ واﻟﺠﺎﻣﻌﻴﺔ , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ.
          </p>

          <div className="row g-3 py-4">
            <div className="col-md-4   wow animate__animated animate__bounceInRight"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5">ﻛﻮرﺳﺎت ﻣﻤﻴﺰة </h4>
                <img src={feature1} className={` py-3 ${style.feature}  `} alt="" />
                <p className="p-2 small text-muted ">
                  نعمل جاهدين على توفير كافة المواد على المنصة ومن أكثر من مدرس
                  لتتمكنوا من حضور الدرس مع المدرس المفضل لديكم
                </p>
              </div>
            </div>
            <div className="col-md-4  wow animate__animated animate__bounceIn"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5 ">ﻓﻴﺪﻳﻮﻫﺎت ﻋﺎﻟﻴﺔ اﻟﺠﻮدة
                </h4>
                <img src={feature2} className={` py-3 ${style.feature} `} alt="" />
                <p className="p-2 small text-muted ">
                  نعمل على إنتاج محتوى عالي الجودة في استديوهاتنا المتخصصة لأجل
                  ضمان عملية تعليمية مريحة خالية من الشوائب
                </p>
                <br />
              </div>
            </div>
            <div className="col-md-4  wow animate__animated animate__bounceInLeft"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5 ">اﺧﺘﺒﺎرات و واﺟﺒﺎت                </h4>
                <img src={feature3} className={` py-3 ${style.feature}`} alt="" />
                <p className="p-2 small text-muted">
                  يتم تصميم الأسئلة والواجبات بعناية لضمان المستوى التعليمي لأبنائنا من الطلاب
                </p>
                <br />
                <br />
              </div>
            </div>
            <div className="col-md-4  wow animate__animated animate__bounceInRight"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5 ">ﺑﻨﻚ اﺳﺄﻟﺔ
                </h4>
                <img src={feature4} className={` py-3 ${style.feature}`} alt="" />
                <p className="p-2 small text-muted">
                  لن تحتاج إلى أي من الكتب الخارجية, لاننا نقوم بتحديث بنك الاسئلة الخاص بنا دوريا بالتعاون مع نخبة من أكبر مدرسين المواد في الجمهورية

                </p>

              </div>
            </div>
            <div className="col-md-4  wow animate__animated animate__bounceIn"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5 ">ﺗﻘﻴﻴﻢ ﻣﺴﺘﻤﺮ
                </h4>
                <img src={feature5} className={` py-3 ${style.feature}`} alt="" />
                <p className="p-2 small text-muted mt-4">
                  هدفنا طمانتكم ولذلك يقوم فريق كامل من المساعدين بمتابعة مستوى أبنائنا مع أولياء الأمور

                </p>

                <br />
                <br />
              </div>
            </div>
            <div className="col-md-4  wow animate__animated animate__bounceInLeft"  >
              <div className={` ${style.caption} rounded-4 border border-1 border-muted py-2`}>
                <h4 className="my-4 h5 ">تفاعلات                </h4>
                <img src={feature6} className={` py-3 ${style.feature}`} alt="" />
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
            <h3 className="mb-3">ﻧﺨﺒﺔ ﻣﻦ اﻓﻀﻞ المدرسين  </h3>
            <p>
              ﺗﻌﻠﻢ ﺑﺄﺣﺪث اﻟﻄﺮق ﻣﻦ ﺧﻠﺎل ﻣﻨﺼﺘﻨﺎ,ﻓﺄﻧﻨﺎن ﻧﻮﻓﺮ ﻟﻚ اﻟﻌﺪﻳﺪ ﻣﻦ اﻟﻜﻮرﺳﺎت
              اﻟﺨﺎﺻﺔ ﺑجميع المراحل التعليمية , ﺑﺄﺣﺪث ﻃﺮق اﻟﻤﺘﺎﺑﻌﺔ واﻟﺘﻘﻴﻴﻢ..
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
            {allTeachers?.length > 0 ? allTeachers.map((item, index) => (
              <SwiperSlide key={index}>
                <div className=" py-2 itemSlide">
                  <img src={item.image || item.gender == "male" ? mr : mrs} className="w-75  rounded-circle " alt="" />
                  <h4 className="my-4 h6">أ/  {item.fullName}</h4>
                  <p className="my-4 small text-primary">
                    <span className="bg-light text-black p-2 rounded">
                      {item.courseId?.name}
                    </span>
                  </p>
                </div>
              </SwiperSlide>
            )) : arr2.map((item, index) => (
              <SwiperSlide key={index}>
                <div className=" py-2 itemSlide card-text placeholder-glow">
                  <img src={fakeImage} className="w-75   rounded-circle " alt="Loaing image" />
                  <h4 className="my-5 p-2 placeholder col-7"></h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
