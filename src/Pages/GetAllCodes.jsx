import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import style from "../../src/Styles/Auth.module.css";

export default function GetAllCodes() {
  const [codes, setcodes] = useState([]);
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [errorForm, seterrorForm] = useState("");
  const [isLoading, setIsloading] = useState(false);

  async function deleteItem(id) {
    setIsloading(true);
    console.log(id);
    try {
        await axios
            .delete(`${baseURL}/codes/delete?codeId=${id}`, {
                headers: {
                    token: `online__${Cookies.get("token")}`,
                },
            }).then(()=>{
                setIsloading(false);
            })
    } catch (error) {
        seterrorForm(error.message)
        setIsloading(false);

    }
  }
  async function getAll() {
    const { data } = await axios.get(`${baseURL}/codes`);
    setcodes(data.data); // [0:{ id : "" ,codes:[] },1:{id:" ",codes:[]}]
  }
  function print() {
    window.print();
  }
  useEffect(() => {
    getAll();
  }, [codes]);

  return (
    <>
      <div className="container py-5">
        {isLoading ? (
          <div
            className="bg-white position-fixed start-50 top-50  p-3"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <i className="fa fa-spin fa-spinner h3"></i>
          </div>
        ) : (
          ""
        )}
        <div>
          {codes.map((item, index) => (
            <div
              key={index}
              className=" row gy-2 border border-1 border-muted p-2 rounded-2"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{item.codeAssignedToCourse[0].courseId.name}</h3>
                <div>
                  <button
                    onClick={() => {
                      print();
                    }}
                    className={` p-2 border-0 rounded-2 ${style.btnOrange} my-3  `}
                  >
                    اطبع
                  </button>
                  <button
                    onClick={() => {
                      deleteItem(item._id);
                    }}
                    className={` p-2 border-0 rounded-2 bg-danger my-3 mx-2 `}
                  >
                    حذف
                  </button>
                </div>
              </div>
              {item.codes.map((codes, indx) => (
                <div
                  key={indx}
                  className=" col-md-3 col-lg-2 col-sm-4 w-25 text-center border border-1 border-muted p-2 rounded-2"
                >
                  <p>{codes}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {errorForm ? (
          <p className="text-danger py-1 text-center small">
            لديك مشكلة في اخر عملية
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
