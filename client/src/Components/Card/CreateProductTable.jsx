/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import moment from "moment";

const CreateProductTable = ({ item }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell component="th" scope="row">
          {item.images && item.images[0] && (
            <img src={item.images[0]} alt="" className="w-40" />
          )}
        </TableCell>
        <TableCell align="right">{item.title}</TableCell>
        <TableCell align="right">{item.description}</TableCell>
        <TableCell align="right">{item.quantity}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
        <TableCell align="right">{moment(item.createAt).format("DD/MM/YYYY")}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CreateProductTable;
