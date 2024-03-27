// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../../Layouts/NavBar";
import { useSelector } from "react-redux";
import Footter from "../../Layouts/Footter";

//MUI
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ProductTableOrderProduct } from "../../Card/ProductTableOrderProduct";
import { Link, useNavigate } from "react-router-dom";
import { userCart } from "../../Functions/user";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const getTotal = () => {
    return (
      cart &&
      cart.reduce((currenValue, nextValue) => {
        console.log(currenValue);
        return currenValue + nextValue.count * nextValue.price;
      }, 0)
    );
  };
  const ShowOrderProduct = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">count</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          {cart &&
            cart.map((item, index) => (
              <ProductTableOrderProduct key={index} item={item} />
            ))}
        </Table>
      </TableContainer>
    );
  };
  const listOrderProduct = () => {
    return cart == null || !cart.length ? (
      <p className="text-[20px] text-gray-500 flex justify-center my-10">
        ไม่มีสินค้า
      </p>
    ) : (
      cart.map((item, index) => (
        <p key={index} className="text-[20px] text-gray-700">
          {item.title} X {item.count} = {item.price * item.count}
        </p>
      ))
    );
  };
  const handlesaveorder = () => {
    if (!cart.length) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีสินค้า",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "เเน่ใจหรือไม่ที่จะสั่งสินค้า?",
        text: `สินค้าทั้งหมด ${cart.length} รายการ`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          userCart(user.user.token, cart)
            .then((res) => {
              console.log(res.data);
              navigate("/chackout");
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };
  console.log(cart);
  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex flex-col justify-between bg-gray-200">
        <div className="flex flex-col lg:flex-row justify-between ">
          <div className="w-full lg:w-2/3 border-r-4 border-gray-300">
            <h4 className="text-[32px] m-3 text-gray-700">รายการ</h4>
            {!cart || !cart.length ? (
              <p className="text-[24px] h-5/6 flex justify-center text-gray-500 items-center">
                ไม่มีสินค้า
              </p>
            ) : (
              ShowOrderProduct()
            )}
          </div>
          <div className="w-full lg:w-1/3 lg:h-screen">
            <div className="m-3">
              <h4 className="text-[32px] m-3 text-gray-700">รายการทั้งหมด</h4>
              <hr className="border-2 border-gray-300" />
              <p>{listOrderProduct()}</p>
              <hr className="border-2 border-gray-300" />
              <h4 className="text-[32px] m-3 text-gray-700">รวมทั้งหมด</h4>
              <p className="text-[20px] text-gray-700">{getTotal()}</p>
              <hr className="border-2 border-gray-300" />
              {user.user.token ? (
                <button
                  type="submit"
                  onClick={handlesaveorder}
                  className="btn btn-active px-10 mt-3"
                >
                  ชำระสินค้า
                </button>
              ) : (
                <Link to={"/login"}>
                  <button
                    type="submit"
                    className="btn btn-error px-10 mt-3 text-white"
                  >
                    เข้าสู่ระบบก่อนชำระเงิน
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Footter />
        </div>
      </div>
    </>
  );
};

export default Cart;
