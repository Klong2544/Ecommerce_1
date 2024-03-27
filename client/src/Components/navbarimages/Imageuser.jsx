// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Stores/userSlice";

const Imageuser = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutauth = () => {
    dispatch(
      logout({
        payload: null,
      })
    );
    navigate("/");
  };
  return (
    <>
      {user.user.token && (
        <>
          <div className="dropdown dropdown-end flex flex-col items-center ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            {user.user.role == "admin" ? (
              <div className="badge badge-accent">{user.user.role}</div>
            ) : (
              <div className="badge badge-primary">{user.user.role}</div>
            )}
            {user.user.role == "admin" ? (
              <ul
                tabIndex={0}
                className="mt-10 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white text-gray-700 rounded-box w-52"
              >
                <li>
                  <a href="/admin/index" className="justify-between">
                    รายการสินค้า
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={logoutauth}>ออกจากระบบ</a>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className="mt-10 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white text-gray-700 rounded-box w-52"
              >
                <li>
                  <a href="/user/information" className="justify-between">
                    ข้อมูลผู้ใช้
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={logoutauth}>ออกจากระบบ</a>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Imageuser;
