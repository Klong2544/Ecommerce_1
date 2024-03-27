/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Input from "@mui/material/Input";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import {useDispatch} from 'react-redux'
 
export const ProductTableOrderProduct = ({ item }) => {
  const dispatch = useDispatch()
  const handleChangCount = (e) => {
    let cart = [];
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      Swal.fire("จำนวนถึงขีดจำกัด!!!!");
      return;
    }

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });
    localStorage.setItem('cart',JSON.stringify(cart))
    dispatch({
      type:'ADD_TO_CART',
      payload:cart,
    })
  };
  const handleRemoveOrderProduct =()=>{
    let cart = [];
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((product,i)=>{
      if(product._id == item._id){
        cart.splice(i,1)
      }
    })
    localStorage.setItem('cart',JSON.stringify(cart))
    dispatch({
      type:'ADD_TO_CART',
      payload:cart,
    })
  }
  return (
    <TableBody>
      <TableRow >
        <TableCell component="th" scope="row">{item.images && item.images[0] &&(
          <img src={item.images[0]} alt="" className="w-40" />
        )}</TableCell>
        <TableCell align="right">{item.title}</TableCell>
        <TableCell align="right">
          <Input value={item.count} type="number" onChange={(e) => handleChangCount(e)} />
        </TableCell>
        <TableCell align="right">{item.price}</TableCell>
        <TableCell align="right"><DeleteIcon onClick={handleRemoveOrderProduct}/></TableCell>
      </TableRow>
    </TableBody>
  );
};
