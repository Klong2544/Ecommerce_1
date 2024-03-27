/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from "@mui/icons-material/Delete";

const AdminProductCard = ({ product, handleremoveproduct }) => {
  const { _id, title, price, description, images } = product;
  return (
    <div className=" rounded-lg bg-gray-300 shadow-xl h-64 w-64 transition duration-300 hover:scale-105">
      <figure className="flex justify-center items-center object-cover">
        <img
          className="rounded-t-lg w-full h-40 "
          src={images[0]}
          alt="Shoes"
        />
      </figure>
      <div className="flex flex-col m-5 text-gray-700">
        <h2 className="">ชื่อ : {title}</h2>
        <p>รายละเอียด : {description}</p>
        <p>ราคา : {price}</p>
        <div className="flex justify-around mt-5">
          <Link to={"/admin/update-product/" + _id}>
            <EditNoteIcon/>
          </Link>
          <DeleteIcon onClick={() => handleremoveproduct(_id)} />
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
