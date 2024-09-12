import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function GetAllSubCategory() {
  let arr = [1, 2, 3, 4];
  const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
  const [supCategories, setsupCategories] = useState([]);
  const [errorForm, seterrorForm] = useState("");
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
  let date = new Date();
  async function getAll() {
    const { data } = await axios.get(`${baseURL}/subcategory/`);
    setsupCategories(data.Subcategories)
  }

  async function deleteItem(id) {
    try {
      await axios
        .delete(`${baseURL}/subcategory/delete?subCategoryId=${id}`, {
          headers: {
            token: `online__${Cookies.get("token")}`,
          },
        })
    } catch (error) {
      console.log(error);
      seterrorForm(error.message)
    }

  }

  useEffect(() => {
    getAll();
  }, [supCategories]);

  return (
    <>
      <div className="container py-5">
        <table className="table table-striped text-center  table-hover table-bordered">
          <thead>
            <tr>
              <th className="py-3" scope="col">
                #
              </th>
              <th className="py-3" scope="col">
                الصف الدراسي
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
            {supCategories?.length > 0
              ? supCategories.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{stage[item.name]} {grade[item.categoryId.name]}</td>
                  <td>{date.toISOString(item.createdAt).split("T")[0]}</td>
                  <td className="d-flex justify-content-center justify-content-center">
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => { deleteItem(item.id); }}
                    >
                      حذف
                    </button>
                    <div>
                      <Link
                        className="btn btn-primary"
                        to={`/admin/updatesubcategory/${item.name}/${item.id}`}
                      >
                        تعديل
                      </Link>


                    </div>
                  </td>
                </tr>
              ))
              : arr.map((item, index) => (
                <tr key={index}>
                  <th className="placeholder-glow   p-3"></th>
                  <td className="placeholder-glow   p-3"></td>
                  <td className="placeholder-glow   p-3"></td>
                  <td className="placeholder-glow   p-3"></td>
                </tr>
              ))}
          </tbody>
        </table>
        {errorForm ? <p className="text-danger py-1 text-center small"> لديك مشكلة في اخر عملية </p> : ''}
      </div>
    </>
  );
}
