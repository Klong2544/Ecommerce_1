const express = require("express");
const router = express.Router();
const { regisrer, login, currenUser } = require("../Controllers/auth");
const { auth, adminCheck } = require("../Middleware/auth");

router.post("/register", regisrer);
router.post("/login", login);
router.post("/current-user", auth, currenUser);
router.post("/current-admin",auth,adminCheck, currenUser);



module.exports = router;
