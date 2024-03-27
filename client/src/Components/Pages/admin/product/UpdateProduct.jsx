// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { readProduct, updarteProduct } from "../../../Functions/product";
import { getallcategory } from "../../../Functions/category";
import FileIpload from "../../../Pages/admin/product/FileIpload";
import NavBar from "../../../Layouts/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

// eslint-disable-next-line react/prop-types
const UpdateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();
  const navigate = useNavigate();
  const [values, setvalues] = useState(initialstate);
  const [category, setcategory] = useState([]);

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);
  const loadData = (id) => {
    readProduct(id)
      .then((res) => {
        setvalues({ ...values, ...res.data });
      })
      .catch((err) => console.log(err));
    getallcategory()
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChangProduct = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    updarteProduct(user.user.token, values._id, values)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Update Success!",
          icon: "success",
        });
        navigate("/admin/index")
      })
      .catch((err) => console.log(err));
  };
  console.log(values);
  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex justify-center items-center bg-gray-200">
        <div className="w-full h-screen m-10">
          <form
            action=""
            className="flex flex-col gap-5 border-4 border-gray-300 mt-5"
            onSubmit={handleSubmitProduct}
          >
            <h4 className="flex justify-center text-3xl font-bold text-black mt-2">
              Update Product
            </h4>
            <div className="mx-5">
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                title
              </label>
              <input
                name="title"
                type="text"
                value={values.title}
                placeholder="ชื่อสินค้า"
                className="input input-bordered w-full bg-gray-300"
                onChange={(e) => handleChangProduct(e)}
              />
            </div>
            <div className="mx-5">
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                description
              </label>
              <input
                name="description"
                type="text"
                value={values.description}
                placeholder="คำอธิบายสินค้า"
                className="input input-bordered w-full bg-gray-300"
                onChange={(e) => handleChangProduct(e)}
              />
            </div>
            <div className="mx-5">
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                price
              </label>
              <input
                name="price"
                type="number"
                value={values.price}
                placeholder="ราคาสินค้า"
                className="input input-bordered w-full bg-gray-300"
                onChange={(e) => handleChangProduct(e)}
              />
            </div>
            <div className="mx-5">
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                quantity
              </label>
              <input
                name="quantity"
                type="number"
                value={values.quantity}
                placeholder="จำนวนสินค้า"
                className="input input-bordered w-full bg-gray-300"
                onChange={(e) => handleChangProduct(e)}
              />
            </div>
            <div className="mx-5">
              <label htmlFor="" className="text-lg font-medium text-gray-700">
                category
              </label>
              <select
                name="category"
                value={values.category}
                className="select select-bordered w-full bg-gray-300"
                onChange={(e) => handleChangProduct(e)}
              >
                <option disabled selected>
                  -หมวดหมู่สินค้า
                </option>
                {category &&
                  category.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.namecategory}
                    </option>
                  ))}
              </select>
              <FileIpload values={values} setvalues={setvalues} />
            </div>
            <div className="flex justify-center items-center mb-10 mt-10">
              <button type="submit" className="btn btn-active px-10">
                เพิ่มสินค้า
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
