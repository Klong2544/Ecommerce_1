// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../../Layouts/NavBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Footter from "../../../Layouts/Footter";
import {
  createCategory,
  getallcategory,
  removecategory,
  readcategory,
  updatecategory,
} from "../../../Functions/category";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [datacategory, setdataproduct] = useState({
    namecategory: "",
  });
  const [editcategory, seteditcategory] = useState({
    _id: "",
    namecategory: "",
  });
  const [category, setcategory] = useState([]);
  useEffect(() => {
    loaddatacategory();
  }, []);
  const loaddatacategory = () => {
    getallcategory()
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleProductChang = (e) => {
    setdataproduct({
      ...datacategory,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    createCategory(user.user.token, datacategory)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Create success",
          icon: "success",
        });
        loaddatacategory();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error" + err.response,
          icon: "error",
        });
      });
  };
  const handleremovecategory = (id) => {
    Swal.fire({
      title: "Are you sure Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        removecategory(user.user.token, id)
          .then((res) => {
            console.log(res.data);
            loaddatacategory();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const handleIdCategory = (id) => {
    readcategory(user.user.token, id)
      .then((res) => {
        seteditcategory({
          ...editcategory,
          _id: id,
          namecategory: res.data.namecategory,
        });
      })
      .catch((err) => console.log(err));
  };
  const handleupdatecategory = () => {
    updatecategory(user.user.token, editcategory._id, editcategory)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Update success",
          icon: "success",
        });
        loaddatacategory();
      })
      .catch((err) => console.log(err));
  };
  console.log(editcategory);
  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex flex-col lg:flex-row bg-gray-200">
        <div className="w-full lg:w-2/3 xl:w-2/4 rounded-lg border-4 border-gray-300">
          <form
            onSubmit={handleProductSubmit}
            className="flex flex-col items-center gap-10"
          >
            <label htmlFor="" className=" text-3xl mt-3 text-gray-700">
              เพิ่มหมวดหมู่
            </label>
            <input
              type="text"
              name="namecategory"
              onChange={(e) => handleProductChang(e)}
              className="input input-bordered w-full max-w-sm bg-gray-300"
            />
            <button type="submit" className="btn btn-neutral w-full max-w-sm mb-3">
              เพิ่มสินค้า
            </button>
          </form>
        </div>
        <div className="w-full  mt-3 lg:mt-0  rounded-lg border-4 border-gray-300">
          {category.map((item, index) => (
            <ul
              key={index}
              className="p-3 text-gray-700 border-2 border-gray-300 m-2 rounded-lg shadow-md"
            >
              <li className="flex justify-between m-2">
                <span className="text-xl">{item.namecategory}</span>
                <div className="flex justify-center items-center gap-10">
                  <DeleteForeverIcon
                    onClick={() => handleremovecategory(item._id)}
                  />
                  <BorderColorIcon
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
                      handleIdCategory(item._id);
                    }}
                  />
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box bg-gray-300 flex flex-col items-center gap-5">
                      <h3 className="font-bold text-xl text-gray-700">
                        เเก้ไขหมวดหมู่
                      </h3>
                      <input
                        type="text"
                        placeholder="ชื่อ"
                        value={editcategory.namecategory}
                        onChange={(e) =>
                          seteditcategory({
                            ...editcategory,
                            namecategory: e.target.value,
                          })
                        }
                        className="input input-bordered bg-gray-300 border border-gray-700 w-full max-w-xs"
                      />
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-3">
                            <button
                              onClick={handleupdatecategory}
                              className="btn btn-active btn-success"
                            >
                              ตกลง
                            </button>
                            <button className="btn btn-active">ยกเลิก</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
        <div className="w-full  ">
          <Footter />
        </div>
    </div>
  );
};

export default CreateCategory;
