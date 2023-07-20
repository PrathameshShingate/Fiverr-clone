const express = require("express");
const router = express.Router();
const {
  login,
  signUp,
  getUserInfo,
  setUserInfo,
  setUserSellerOrBuyer,
} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/get-user-info", verifyToken, getUserInfo);
router.put("/set-user-info", verifyToken, setUserInfo);
router.put("/set-user-seller-or-buyer", verifyToken, setUserSellerOrBuyer);

module.exports = router;
