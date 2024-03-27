// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import { getUserCart } from "../../Functions/user";
import { useSelector, useDispatch } from "react-redux";
import FormAddress from "../../Card/FormAddress";
import { saveAddress, saveOrder, clearOrder } from "../../Functions/user";
import { useNavigate,Link } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const initAlladdress = {
  address: "",
  name: "",
  phonenumber: "",
};

const ChackOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [address, setAddress] = useState(initAlladdress);
  const [products, serProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addressSave, setaddressSave] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    loadDataOrder();
  }, []);

  console.log(address);
  const loadDataOrder = () => {
    getUserCart(user.user.token)
      .then((res) => {
        serProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };
  const handleSaveaddress = () => {
    saveAddress(user.user.token, address)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          });
          setaddressSave(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSaveOrderProduct = () => {
    if (!addressSave || !products.length) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "กรุณาใส่ที่อยู่",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      saveOrder(user.user.token)
        .then((res) => {
          console.log(res.data);
          clearOrder(user.user.token);
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกรายการสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          });
          if (user.user.role == "admin") {
            navigate("/admin-order");
          } else {
            navigate("/user/history");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <NavBar />
      <div className="w-full flex flex-col lg:flex-row lg:h-screen justify-center bg-gray-200">
        <div className="w-full">
          <div className="m-3">
            <h4 className="text-[32px] text-gray-700 mb-3">กรุณาใส่ที่อยู่</h4>
            <FormAddress address={address} setAddress={setAddress} />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSaveaddress}
                className="p-3 px-4 bg-blue-500 text-gray-700 rounded-lg hover:bg-blue-700"
              >
                บันทึกที่อยู่
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="m-3 flex flex-col gap-10">
            <h4 className="text-[32px] text-gray-700 mb-3">รายการสินค้า</h4>
            <div className="w-full flex justify-center">
              <div className="w-full  m-0">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>รายการ</TableCell>
                        <TableCell align="right">จำนวน</TableCell>
                        <TableCell align="right">ราคา</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.product.title}
                          </TableCell>
                          <TableCell align="right">{item.count}</TableCell>
                          <TableCell align="right">
                            {item.product.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <h4 className="text-[24px] text-gray-500">ราคาสินค้าทั้งหมด</h4>
            <div className="flex justify-center">
              <p className="text-[40px] text-gray-700">{total} ฿</p>
            </div>
            <button
              onClick={handleSaveOrderProduct}
              className="p-3 bg-green-500 text-gray-700 rounded-lg hover:bg-green-700"
            >
              ชำระเงิน
            </button>
            <Link to={'/cart'} className="p-3 text-center bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              ยกเลิก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChackOut;
