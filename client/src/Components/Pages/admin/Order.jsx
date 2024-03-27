// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import Footter from "../../Layouts/Footter";
import {
  getOrderAdmin,
  updateStatusOrder,
  removeOrderAdmin,
  readOrderadmin,
} from "../../Functions/admin";
import { useSelector } from "react-redux";
import ModelOrder from "../../Model/ModelOrder";

//MUI

import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadDataOrder();
  }, []);
  const statusOrder = ["Not Process", "Processing", "Cancelled", "Completed"];
  const loadDataOrder = () => {
    getOrderAdmin(user.user.token)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleProcess = (orderstatus, id) => {
    updateStatusOrder(user.user.token, orderstatus, id)
      .then((res) => {
        console.log(res);
        loadDataOrder();
      })
      .catch((err) => console.log(err));
  };
  const handleReadOrder = (orderId) => {
    readOrderadmin(user.user.token, orderId)
      .then((res) => {
        console.log(res.data);
        handleRemoveOrder(orderId, res.data.orderstatus);
      })
      .catch((err) => console.log(err));
  };
  const handleRemoveOrder = (id, status) => {
    console.log(status);
    if (status == "Cancelled" || status == "Completed") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          removeOrderAdmin(user.user.token, id)
            .then((res) => {
              console.log(res.data);
              loadDataOrder();
            })
            .catch((err) => console.log(err));
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "ไม่สามารถลบได้กำลังดำเนินการอยู่!",
      });
    }
  };
  return (
    <div className="overflow-hidden h-screen">
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center gap-4 bg-gray-200 overflow-y-auto max-h-[90%]">
        {orders &&
          orders.map((itemOrder, index) => (
            <div
              key={index}
              className="w-full md:w-3/4 lg:w-2/3 m-3 h-1/3 flex flex-col justify-center items-center border-2 border-gray-500 rounded-lg "
            >
              <div className="w-full flex flex-col items-center gap-3 border-b-2 border-gray-500">
                <h4 className="text-[24px] lg:text-[32px] text-gray-700 font-bold">
                  รายการสินค้า
                </h4>

                <div className="w-full flex justify-between items-center gap-3 lg:gap-0">
                  <h4 className="flex gap-2 text-lg text-gray-700">
                    <p className="text-[16px] lg:text-[24px] w-14 lg:w-20 font-semibold ml-3">
                      ชื่อผู้สั่ง
                    </p>
                    {itemOrder.orderBy.username}
                  </h4>
                  <select
                    value={itemOrder.orderstatus}
                    onChange={(e) =>
                      handleProcess(e.target.value, itemOrder._id)
                    }
                    className="select w-full max-w-xs  bg-gray-300 border-2 border-gray-500 text-gray-700"
                  >
                    {statusOrder.map((itemStatus, index) => (
                      <option key={index}>{itemStatus}</option>
                    ))}
                  </select>
                  {itemOrder.orderBy.addressBy.map((itemAddress, index) => (
                    <div key={index}>
                      <ModelOrder Address={itemAddress} />
                    </div>
                  ))}
                  <div className="mr-3">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleReadOrder(itemOrder._id)}
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center">
                  {itemOrder.products.map((itemproduct, index) => (
                    <div key={index} className="w-3/4 flex justify-around p-3">
                      <p className="text-[16px] md:text-[24px] text-gray-500">
                        {itemproduct.product.title}
                      </p>
                      <p className="text-[16px] md:text-[24px] text-gray-500">
                        {itemproduct.count}
                      </p>
                      <p className="text-[16px] md:text-[24px] text-gray-500">
                        {itemproduct.price} ฿
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p className=" text-[16px] md:text-[24px] text-gray-700 font-semibold">
                ราคารวม {itemOrder.cartTotal} ฿
              </p>
            </div>
          ))}
        <div className="w-full">
          <Footter />
        </div>
      </div>
    </div>
  );
};

export default Order;
