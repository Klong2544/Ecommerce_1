/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ModelOrder = ({ Address }) => {
  const { address, name, phonenumber } = Address;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} style={{ fontSize: "16px" }}>
        รายละเอียด
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#000000", fontWeight: "bold", fontSize: "24px" }}
          >
            รายละเอียดที่อยู่
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontSize: "20px", color: "#30302f" }}
          >
            ที่อยู่: {address}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontSize: "20px", color: "#30302f" }}
          >
            ชื่อ: {name}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontSize: "20px", color: "#30302f" }}
          >
            เบอร๋โทร: {phonenumber}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModelOrder;
