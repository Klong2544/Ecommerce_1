// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import { useSelector } from "react-redux";
import { getOrderUser } from "../../Functions/user";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [order, setOrder] = useState([]);

  useEffect(() => {
    loadDataOrder();
  }, []);

  const loadDataOrder = () => {
    getOrderUser(user.user.token)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="overflow-hidden h-screen">
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center gap-4 bg-gray-200 overflow-y-auto max-h-screen">
        {order.map((itemOrder, index) => (
          <div
            key={index}
            className="w-1/2 m-5 h-1/3 flex flex-col justify-center items-center border-2 border-gray-500 rounded-lg "
          >
            <div className="w-full flex flex-col items-center gap-5">
              <h4 className="text-[32px] mt-3 text-gray-700 font-bold">
                รายการสินค้า
              </h4>
              <p className="text-[16px]">
                {itemOrder.orderstatus == "Not Process" ? (
                  <ul className="steps">
                    <li className="step step-primary">Not Process</li>
                    <li className="step text-yellow-500">Processing</li>
                    <li className="step  text-green-500">Completed</li>
                  </ul>
                ) : itemOrder.orderstatus == "Processing" ? (
                  <ul className="steps">
                    <li className="steps step-primary">Not Process</li>
                    <li className="step step-primary text-yellow-500">Processing</li>
                    <li className="step text-green-500">Completed</li>
                  </ul>
                ) : itemOrder.orderstatus == "Cencelled" ? (
                  "text-gray-400"
                ) : itemOrder.orderstatus == "Completed" ? (
                  <ul className="steps">
                    <li className="step step-primary">Not Process</li>
                    <li className="step step-primary text-yellow-500">Processing</li>
                    <li className="step step-primary text-green-500">Completed</li>
                  </ul>
                ) : (
                  "No status"
                )}
              </p>
              {itemOrder.products.map((itemproduct, index) => (
                <div key={index} className="w-3/4 flex justify-between">
                  <img
                    src={itemproduct.product.images[0]}
                    alt=""
                    className="w-40 h-30"
                  />
                  <div className="w-3/4 flex justify-around p-3">
                    <p className="text-[20px] text-gray-500">
                      {itemproduct.product.title}
                    </p>
                    <p className="text-[20px] text-gray-500">
                      {itemproduct.count}
                    </p>
                    <p className="text-[20px] text-gray-500">
                      {itemproduct.price}
                    </p>
                  </div>
                </div>
              ))}
              <p className="text-[24px] text-gray-700 font-semibold mb-2">
                ราคารวม {itemOrder.cartTotal} ฿
              </p>
            </div>
            <p className="mt-3 text-[24px] text-gray-700 font-semibold"></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
