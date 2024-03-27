// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../../Layouts/NavBar";
import { useSelector } from "react-redux";
import { getallcategory } from "../../../Functions/category";
import ModelCreateProduct from "../../../Model/ModelCreateProduct";
import { createProduct } from "../../../Functions/product";
import { getAllProduct } from "../../../Functions/product";
import CreateProductTable from "../../../Card/CreateProductTable";

import Swal from "sweetalert2";

//MUI
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setvalues] = useState(initialstate);
  const [product,setProduct] = useState([])

  useEffect(() => {
    loaddatcategory();
  }, []);
  const loaddatcategory = () => {
    getallcategory()
      .then((res) => {
        setvalues({
          ...values,
          categories: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  const handelSubmitProduct = (e) => {
    e.preventDefault();
    createProduct(user.user.token, values);
    Swal.fire({
      title: "Create success",
      icon: "success",
    })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error" + err.response,
          icon: "error",
        });
      });
  };
  //Product
  useEffect(() => {
    loaddDataproduct(50);
  }, []);
  const loaddDataproduct = (count) => {
    getAllProduct(count)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  const ShowCreateProduct = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">quantity</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">CreatedAt</TableCell>
            </TableRow>
          </TableHead>
          {product && product.map((item, index) => (
            <CreateProductTable key={index} item={item} />
          ))}
        </Table>
      </TableContainer>
    );
  };
  return (
    <div className="mx-auto overflow-hidden">
      <NavBar />
      <div className="w-full  h-screen flex flex-col  bg-gray-200 ">
        <div className="w-full flex justify-end ">
          <button
            className="btn bg-green-600 mt-3 text-gray-300 text-[24px] border-none mr-3 "
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            create <AddIcon />
          </button>
          <ModelCreateProduct
            values={values}
            setvalues={setvalues}
            handelSubmitProduct={handelSubmitProduct}
          />
        </div>
        <div className="mt-3">{ShowCreateProduct()}</div>
      </div>
    </div>
  );
};

export default CreateProduct;
