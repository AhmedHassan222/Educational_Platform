import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function GetAllCategories() {
  // VARIABLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const arr = [1, 2, 3, 4];
  const grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [categories, setcategories] = useState([]);
  const [errorForm, seterrorForm] = useState("");
  const [isLoading, setIsloading] = useState(false);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // FUNCTION GET ALL CATEGORIES >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function getAll() {
    const { data } = await axios.get(`${baseURL}/category`);
    setcategories(data.categories);
  }
  // USEEFFECT 
  useEffect(() => {
    getAll();
  }, [categories]);
  // FUNCTION DELETE CATEGORY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function deleteItem(id) {
    setIsloading(true)
    try {
      await axios
        .delete(`${baseURL}/category/delete?categoryId=${id}`, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        }).then(() => {
          setIsloading(false);
          toast.success('قد تم الحذف', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        });
    } catch (error) {
      setIsloading(false);
      seterrorForm(error);
    }
  }
  // RENGER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <>
      {isLoading ? <div className="text-white position-fixed start-50 top-50  p-4" style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <i className="fa fa-spin fa-spinner h3"></i>
      </div> : ""}
      <div className="container py-5">
      <ToastContainer />
        <table className="table table-striped text-center  table-hover table-bordered">
          <thead>
            <tr>
              <th className="py-3" scope="col">
                #
              </th>
              <th className="py-3" scope="col">
                المرحله
              </th>
              <th className="py-3" scope="col">
                تاريخ الانشاء
              </th>
              <th className="py-3" scope="col">
                المعاملات{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0
              ? categories.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{grade[item.name]}</td>
                  <td>{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                  <td className="d-flex justify-content-center justify-content-center">
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => { deleteItem(item.id); }} >حذف</button>
                    <div>
                      <Link className="btn btn-primary btn-sm" to={`/admin/updatecategory/${item.name}/${item.id}`}>تعديل</Link>
                    </div>
                  </td>
                </tr>
              ))
              : arr.map((item, index) => (
                <tr key={index}>
                  <th className="placeholder-glow   p-4"></th>
                  <td className="placeholder-glow   p-4"></td>
                  <td className="placeholder-glow   p-4"></td>
                  <td className="placeholder-glow   p-4"></td>
                </tr>
              ))}
          </tbody>
        </table>
        {errorForm ? <p className="text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
      </div>
    </>
  );
}
