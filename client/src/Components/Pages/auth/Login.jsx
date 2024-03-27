// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { loginauth } from "../../Functions/auth";
import { login } from "../../Stores/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChang = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const roleCheckpath = (role) => {
    if (role == "admin") {
      navigate("/admin/index");
    } else {
      navigate("/");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginauth(values)
      .then((res) => {
        console.log(res.data);
        dispatch(
          login({
            token: res.data.token,
            email: res.data.payload.user.email,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          })
        );
        localStorage.setItem("token", res.data.token);
        console.log(res.data.payload.user.role);
        roleCheckpath(res.data.payload.user.role);
        Swal.fire({
          title: "Login Success!",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "error!",
          icon: "error",
        });
      });
  };
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
        <span className="text-xl font-bold text-gray-700">เข้าสู่ระบบ</span>
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
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
