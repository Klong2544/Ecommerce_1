const express = require("express");
const router = express.Router();
const { getAllOrderAdmin,updateorderstatus,removeOrderAdmin,readOrderAdmin } = require("../Controllers/admin");
const { auth,adminCheck } = require("../Middleware/auth");

router.get("/admin-order", auth, getAllOrderAdmin);
router.put("/admin/order-status", auth, updateorderstatus);
router.delete("/admin-order/:id", auth, removeOrderAdmin);
router.get("/admin-order/:id", auth,adminCheck, readOrderAdmin);

module.exports = router;
