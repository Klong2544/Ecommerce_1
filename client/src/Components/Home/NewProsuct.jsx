// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { listByProduct } from "../Functions/product";
import ProductCard from "../Card/ProductCard";

const NewProsuct = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listByProduct("createdAt", "desc", 5)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-96 mb-10  md:w-2/3 lg:w-full flex flex-col items-center md:grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-20 ">
      {product &&
        product.map((itemproduct, index) => (
          <div key={index}>
            <ProductCard product={itemproduct} />
          </div>
        ))}
    </div>
  );
};

export default NewProsuct;
