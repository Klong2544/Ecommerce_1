/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



const FormAddress = ({ address, setAddress }) => {
  const handleChangAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "98%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => handleChangAddress(e)}
          name="address"
          inputProps={{ style: { fontSize: 16 } }}
          label="ที่อยู่"
          InputLabelProps={{
            style: { fontSize: 24 },
          }}
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => handleChangAddress(e)}
          name="name"
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{
            style: { fontSize: 24 },
          }}
          label="ชื่อ-นามสกุล"
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => handleChangAddress(e)}
          name="phonenumber"
          type="number"
          inputProps={{ style: { fontSize: 16 } }}
          label="เบอร์โทร"
          InputLabelProps={{
            style: { fontSize: 24 },
          }}
          color="secondary"
          focused
        />
      </Box>
    </div>
  );
};

export default FormAddress;
