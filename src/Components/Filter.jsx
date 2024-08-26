import style from "../../src/Styles/Filter.module.css"
export default function Filter() {
    const arrclass = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const categories = [1, 2, 3, 4, 5, 6, 7, 8]
    return <>
        <div>
            <input type="text" className="w-100 p-2 bg-light" placeholder="ابحث عن دورة" />
            <div className="border border-1 border-muted my-4 rounded-2">
                <p className="text-black px-3 pt-3 fw-bold">الصفوف الدراسية</p>
                <hr className="text-muted" />
                {arrclass.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                    <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                    <p className="text-muted ">  الصف الاول الثانوي</p>
                </div>)}
            </div>
            <div className="border border-1 border-muted my-4 rounded-2">
                <p className="text-black px-3 pt-3 fw-bold">
                    الفئات
                </p>
                <hr className="text-muted" />
                {categories.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                    <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                    <p className="text-muted ">  الكيمياء</p>
                </div>)}
            </div>
        </div>
    </>
}