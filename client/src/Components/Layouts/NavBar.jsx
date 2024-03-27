// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link} from "react-router-dom";
import ManuBarAdmin from "./ManuBarAdmin";
import ManuBarUser from "./ManuBarUser";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Imageuser from "../navbarimages/Imageuser";
const NavBar = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  

  return (
    <div className="navbar bg-gray-200 border-b-4 border-gray-300 pt-5">
      <div className="flex-1">
        {user.user.token && (
          <>{user.user.role == "admin" ? <ManuBarAdmin /> : <ManuBarUser />}</>
        )}

        <Link to={"/"} className="btn btn-ghost text-xl text-gray-700">
          ตลาด
        </Link>
        <Link to={"/shop"} className="btn btn-ghost text-xl text-gray-700">
          ร้านค้า
        </Link>
        <Badge badgeContent={cart ? cart.length : 0} color="success">
          <Link to={"/cart"} className="btn btn-ghost text-xl text-gray-700">
            รายการ
          </Link>
        </Badge>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control flex flex-row items-center gap-3">
          {!user.user.token && (
            <>
              <Link
                to={"/register"}
                className="btn btn-outline bg-gray-700 text-white text-lg"
              >
                สมัครสมาชิก
              </Link>
              <Link
                to={"/login"}
                className="btn btn-outline text-gray-700 text-lg"
              >
                เข้าสู่ระบบ
              </Link>
            </>
          )}
        </div>
        <Imageuser/>
      </div>
    </div>
  );
};

export default NavBar;
