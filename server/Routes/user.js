const express = require("express");
const router = express.Router();
const {
  getAllUser,
  changRole,
  changStatus,
  removeuser,
  repassworduser,
  usercart,
  getUserCart,
  saveAddress,
  saveOrder,
  clearOrder,
  getorderuser,
  addtowishlist,
  deletewishlist,
} = require("../Controllers/user");
const { auth, adminCheck } = require("../Middleware/auth");

router.post("/chang-role", auth, adminCheck, changRole);
router.post("/change-status", auth, adminCheck, changStatus);
//admin
router.get("/all-user", getAllUser);
router.delete("/user/:id", auth, adminCheck, removeuser);
router.put("/user/:id", auth, adminCheck, repassworduser);

//user
router.post("/user/cart", auth, usercart);
router.get("/user/cart", auth, getUserCart);
//address
router.post("/user/address", auth, saveAddress);

router.post("/user/order", auth, saveOrder);
router.delete("/user/order", auth, clearOrder);
router.get("/user/history", auth, getorderuser);

router.post("/user/wishlist", auth, addtowishlist);
router.post("/user/wishlists", auth, deletewishlist);

module.exports = router;
