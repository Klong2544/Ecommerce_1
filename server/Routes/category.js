const express = require("express");
const router = express.Router();
const { auth, adminCheck } = require("../Middleware/auth");
const { createcategory,getallcategory,removecategory,readcategory,updatecategory } = require("../Controllers/category");

router.post("/category", auth, adminCheck, createcategory);
router.get("/category",getallcategory);
router.delete("/category/:id", auth, adminCheck,removecategory);
router.get("/category/:id", auth, adminCheck,readcategory);
router.put("/category/:id", auth, adminCheck,updatecategory);

module.exports = router;
