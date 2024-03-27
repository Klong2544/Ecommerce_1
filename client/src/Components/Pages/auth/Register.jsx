// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { register } from "../../Functions/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChang = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(values).includes("")) {
      Swal.fire({
        title: "Please fill in all fields!",
        icon: "error",
      });
    } else {
      register(values)
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Sign Success!",
            icon: "success",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Email Invalid!",
            icon: "error",
          });
        });
    }
  };

  console.log(values);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-32 py-28 mb-4 hover:shadow-2xl"
      >
        <div className="absolute my-[-90px] mx-[300px]">
          <Link to={"/"}>
            <CloseIcon style={{ color: "#000000" }} />
          </Link>
        </div>
        <span className="text-xl font-bold text-gray-700">สมัครสมาชิก</span>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ชื่อ
          </label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full  bg-gray-200 text-gray-700"
            onChange={(e) => handleChang(e)}
          />
        </div>
        <div className="mb-6 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 ">
            อีเมล์
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full  bg-gray-200  text-gray-700 "
            onChange={(e) => handleChang(e)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 ">
            รหัสผ่าน
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full  bg-gray-200  text-gray-700"
            onChange={(e) => handleChang(e)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="btn btn-outline w-full border-black text-gray-700"
            type="submit"
          >
            สมัครสมาชิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
