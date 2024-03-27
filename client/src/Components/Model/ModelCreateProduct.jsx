/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import FileIpload from "../Pages/admin/product/FileIpload";

const ModelCreateProduct = ({ values, setvalues, handelSubmitProduct }) => {
  return (
    <dialog id="my_modal_2" className="modal ">
      <div className="modal-box bg-gray-300">
        <form
          onSubmit={handelSubmitProduct}
          action=""
          className="flex flex-col gap-5 border-4 border-gray-300 mt-5"
        >
          <h4 className="flex justify-center text-3xl font-bold text-black mt-2">
            Create Product
          </h4>
          <div className="mx-5 ">
            <label htmlFor="" className="text-lg font-medium text-gray-700 ">
              title
            </label>
            <input
              name="title"
              type="text"
              value={values.title}
              placeholder="ชื่อสินค้า"
              className="input input-bordered w-full bg-gray-300 text-gray-700 text-[20px]"
              onChange={(e) =>
                setvalues({
                  ...values,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="mx-5">
            <label htmlFor="" className="text-lg font-medium text-gray-700">
              description
            </label>
            <input
              name="description"
              value={values.description}
              type="text"
              placeholder="คำอธิบายสินค้า"
              className="input input-bordered w-full bg-gray-300 text-gray-700 text-[20px]"
              onChange={(e) =>
                setvalues({
                  ...values,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="mx-5">
            <label htmlFor="" className="text-lg font-medium text-gray-700">
              price
            </label>
            <input
              name="price"
              value={values.price}
              type="number"
              placeholder="ราคาสินค้า"
              className="input input-bordered w-full bg-gray-300 text-gray-700 text-[20px]"
              onChange={(e) =>
                setvalues({
                  ...values,
                  price: e.target.value,
                })
              }
            />
          </div>
          <div className="mx-5">
            <label htmlFor="" className="text-lg font-medium text-gray-700">
              quantity
            </label>
            <input
              name="quantity"
              value={values.quantity}
              type="number"
              placeholder="จำนวนสินค้า"
              className="input input-bordered w-full bg-gray-300 text-gray-700 text-[20px]"
              onChange={(e) =>
                setvalues({
                  ...values,
                  quantity: e.target.value,
                })
              }
            />
          </div>
          <div className="mx-5">
            <label htmlFor="" className="text-lg font-medium text-gray-700">
              category
            </label>
            <select
              name="category"
              className="select select-bordered w-full bg-gray-300 text-gray-700 text-[20px]"
              onChange={(e) =>
                setvalues({
                  ...values,
                  category: e.target.value,
                })
              }
            >
              <option disabled selected>
                -หมวดหมู่สินค้า
              </option>
              {values.categories &&
                values.categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.namecategory}
                  </option>
                ))}
            </select>
            <FileIpload values={values} setvalues={setvalues} />
          </div>
          <div method="dialog" className="flex justify-center items-center mb-10 mt-10">
            <button type="submit" className="btn btn-active px-10">
              เพิ่มสินค้า
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModelCreateProduct;
