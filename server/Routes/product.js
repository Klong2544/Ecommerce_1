const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  removeProduct,
  readProduct,
  updaetProduct,
  serchProduct,
  listByProduct
} = require("../Controllers/product");
const { auth, adminCheck } = require("../Middleware/auth");

router.post("/product", auth, adminCheck, createProduct);
router.get("/products/:count", getAllProduct);
router.delete("/product/:id", auth, adminCheck, removeProduct);
router.get("/product/:id", readProduct);
router.put("/product/:id", auth, adminCheck, updaetProduct);

//searchProduct
router.post("/search/product",serchProduct);
//newProduct
router.post("/newproduct",listByProduct);

module.exports = router;
