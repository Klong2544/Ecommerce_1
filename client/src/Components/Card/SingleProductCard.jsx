/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { addtoWishlist, deleteWishlist } from "../Functions/user";

//mui
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import _ from "lodash";

const SingleProductCard = ({ product }) => {
  const [value, setValue] = React.useState(0);
  const { _id, title, description, images, price, quantity, sold, category } =
    product;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

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
  const handlewishlist = (wishlist) => {
    const token = localStorage.getItem("token");
    if (user && wishlist) {
      addtoWishlist(token, _id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      deleteWishlist(token, _id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-row-reverse justify-between h-2/3 mx-3 mb-7">
        <div className=" mb-28">
          <Carousel
            autoPlay
            showArrows={true}
            infiniteLoop
            className="w-[700px]"
          >
            {images?.map((image, index) => (
              <div key={index} className="w-full h-full ">
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-full  object-contain object-center"
                />
                <p className="absolute bottom-0 left-0 p-2 text-white bg-black bg-opacity-50">{`Legend ${
                  index + 1
                }`}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full border-4 border-gray-400  flex flex-col justify-between">
          <div className="m-5">
            <h4 className="ml-1 text-[32px] text-gray-700 text-center">
              {title}
            </h4>
            <ul>
              <li className="flex justify-between text-[24px] text-gray-500 mt-5">
                ราคา <span>{price}</span>
              </li>

              <li className="flex justify-between text-[24px] text-gray-500  mt-5">
                quantity <span>{quantity}</span>
              </li>

              <li className="flex justify-between text-[24px] text-gray-500  mt-5">
                ขายไปเเล้ว <span>{sold}</span>
              </li>

              {category && (
                <li className="flex justify-between text-[24px] text-gray-500  mt-5">
                  หมวดหมู่ <span>{category.namecategory}</span>
                </li>
              )}
            </ul>
          </div>
          <Box sx={{ width: 3 / 3 }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <label className="swap swap-flip  w-20">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  onChange={(e) => handlewishlist(e.target.checked)}
                />

                <div className="swap-on flex items-center ">
                  <FavoriteOutlinedIcon style={{ fontSize: 24 }} />
                </div>
                <div className="swap-off flex items-center">
                  <FavoriteBorderOutlinedIcon style={{ fontSize: 24 }} />
                </div>
              </label>
              <a>
                <BottomNavigationAction
                  label="ซื้อสินค้า"
                  icon={
                    <AddShoppingCartIcon
                      onClick={handleAddTocard}
                      style={{ fontSize: 24 }}
                    />
                  }
                />
              </a>
            </BottomNavigation>
          </Box>
        </div>
      </div>
      <div className="w-full h-40 border-4 border-gray-400">
        <div role="tablist" className="tabs tabs-lifted mx-3 ">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="รายละเอียด"
          />
          <div
            role="tabpanel"
            className="tab-content text-gray-700 bg-gray-300 border-base-300 rounded-box p-6"
          >
            {description}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="อื่นๆ"
            checked
          />
          <div
            role="tabpanel"
            className="tab-content text-gray-700 bg-gray-300 border-base-300 rounded-box p-6"
          >
            อื่นๆ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
