// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import Footter from "../../Layouts/Footter";
import AdminProductCard from "../../Card/AdminProductCard";
import { getAllProduct, removeProduct } from "../../Functions/product";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const HomeAdmin = () => {
  const [product, setproduct] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  //loadalldata
  useEffect(() => {
    loadDataProduct(50);
  }, []);
  const loadDataProduct = (count) => {
    getAllProduct(count)
      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleremoveproduct = (id) => {
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
        removeProduct(user.user.token, id)
          .then((res) => {
            console.log(res.data);
            loadDataProduct(50);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div >
      <NavBar />
      <div className=" bg-gray-200 lg:h-screen xl:h-screen flex flex-col justify-between items-center ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 ">
          {product.map((item, index) => (
            <div key={index} className=" mt-5">
              <AdminProductCard
                product={item}
                handleremoveproduct={handleremoveproduct}
              />
            </div>
          ))}
        </div>
        <div className="w-full mt-20 md:mt-20">
          <Footter />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
