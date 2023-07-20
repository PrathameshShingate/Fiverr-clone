const express = require("express");
const verifyToken = require("../middlewares/auth");
const getSellerData = require("../controllers/dashboard.controller");
const router = express.Router();

router.get("/seller", verifyToken, getSellerData);

module.exports = router;
