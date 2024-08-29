import style from "../../src/Styles/Teacher.module.css"
export default function Wallet() {
    return <>
        <div className="container py-5">
            <div>
                <h3 className="mb-4">المحفظة الإلكترونية </h3>
                <div className="border border-1 border-muted rounded-4 py-4 p-2 p-md-4 p-lg-4 row">
                    <div className="col-md-8 col-lg-10">
                        <h4 className=" text-muted">الرصيد الحالي</h4>
                        <h4 className="h3 mb-4 mt-2">0.00 جنية</h4>
                        <p className="text-muted small">
                            يمكنك شحن رصيد محفظتك بوسائل الدفع التي ندعمها لتتمكن من استخدام محفظتك في الشراء داخل المنصة
                        </p>
                    </div>
                    <div className="col-md-4 col-lg-2">
                        <button to={`/tacher/3`} className={` rounded-2 py-2  text-white ${style.btnOrange} w-100 border-0 small `}> شحن المحفظة</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="border border-1 border-muted rounded-4  py-4 p-2 p-md-4 p-lg-4 my-4">
                    <h3 className="h4"> سجل العمليات </h3>
                    <h4 className="h6 text-muted">لا توجد عمليات حتي الان !</h4>
                </div>
            </div>
        </div>
    </>
}