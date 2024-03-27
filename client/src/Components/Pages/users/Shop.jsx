// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import ProductCard from "../../Card/ProductCard";
import Footter from "../../Layouts/Footter";
import { useSelector } from "react-redux";

import { getAllProduct } from "../../Functions/product";
import { getallcategory } from "../../Functions/category";

//searchProduct
import { searchProduct } from "../../Functions/product";
import Search from "../../Card/Search";
const Shop = () => {
  const { search } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [ok, setOk] = useState(false);
  const [datafilter] = useState(["title", "description"]);
  const { text } = search;

  //category
  const [categorySelect, setCategorySelect] = useState([]);

  //price
  const [price, setPrice] = useState([0]);

  useEffect(() => {
    loadData(50);
  }, []);
  const loadData = (count) => {
    getAllProduct(count)
      .then((res) => {
        setProduct(res.data);
        searchContire(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getallcategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  };
  // price
  useEffect(() => {
    if (ok) {
      fetchDatafilter();
    }
  }, [ok]);

  const fetchDatafilter = (arg) => {
    searchProduct(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  //category
  const handleCategoory = (e) => {
    let inCheck = e.target.value;

    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);
    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDatafilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
    setOk(true);
  };
  // //price
  const handleprice = (e) => {
    setPrice(e.target.value);
    setTimeout(() => {
      setOk(true);
      fetchDatafilter({ price });
    }, 300);
  };
  //search
  const searchContire = (contire) => {
    return contire.filter((item) => {
      return datafilter.some((filter) => {
        return (
          item[filter]?.toString().toLowerCase().indexOf(text.toLowerCase()) >
          -1
        );
      });
    });
  };
  console.log(product);
  return (
    <>
      <NavBar />
      <div className="w-full  lg:h-screen flex bg-gray-200">
        <div className=" w-1/4  border-4 border-gray-300 hidden xl:flex xl:flex-col md:gap-3 ">
          <h4 className="text-4xl text-gray-700">ค้นหาสินค้า</h4>
          <span className="text-xl text-gray-700 ">หมวดหมู่</span>
          {category.map((itemcategory, index) => (
            <div key={index} className="form-control mx-3">
              <label className="label cursor-pointer">
                <span className="label-text text-gray-700 text-[20px]">
                  {itemcategory.namecategory}
                </span>
                <input
                  type="checkbox"
                  value={itemcategory._id}
                  onChange={handleCategoory}
                  className="checkbox border-4 border-gray-400"
                />
              </label>
            </div>
          ))}
          <span className="text-xl text-gray-700 ">ราคาสินค้า</span>
          <input
            type="range"
            min={0}
            max="100000"
            value={price}
            className="range "
            onChange={(value) => handleprice(value)}
          />
        </div>
        <div className="w-full m-3">
          <div className="flex justify-center md:justify-between">
            <h4 className="text-2xl text-gray-700 hidden md:block">สินค้า</h4>
            <Search />
          </div>
          {product.length < 1 && (
            <span className="flex justify-center items-end h-1/2 text-4xl text-gray-700">
              ไม่มีสินค้า
            </span>
          )}
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3 ">
            {searchContire(product).map((item, index) => (
              <div key={index} className="ml-5 mt-5 flex justify-center mb-8 md:mb-8">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
          <Footter />
        </div>
    </>
  );
};

export default Shop;
