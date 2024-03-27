/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import PageviewIcon from "@mui/icons-material/Pageview";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const ProductCard = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();
  const { _id, title, description, images, price } = product;
  const handleAddTocard = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };
  return (
    <>
      <div className=" rounded-lg w-64 h-64 bg-gray-300 shadow-xl image-full m-5 transition duration-300 hover:scale-105">
        <figure className="flex justify-center items-center object-cover">
          <img
            className="rounded-t-lg w-full h-40 "
            src={images[0]}
            alt="Shoes"
          />
        </figure>
        <div className="flex flex-col m-5 text-black">
          <h2 className="">ชื่อ : {title} </h2>
          <p>รายละเอียด : {description} </p>
          <p>ราคา : {price}</p>
          <div className="flex justify-around mt-5">
            <Link to={"/product/" + _id}>
              <PageviewIcon />
            </Link>
            <ShoppingBasketIcon onClick={handleAddTocard} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
