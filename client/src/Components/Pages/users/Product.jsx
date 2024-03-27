// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import { readProduct } from "../../Functions/product";
import { useParams } from "react-router-dom";
import SingleProductCard from "../../Card/SingleProductCard";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    loadDataProduct();
  }, []);
  const loadDataProduct = () => {
    readProduct(params.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <>
      <NavBar />
      <div className=" w-full h-screen bg-gray-200">
        <div className="flex flex-row pt-4">
          <SingleProductCard product={product}/>
        </div>
      </div>
    </>
  );
};

export default Product;
