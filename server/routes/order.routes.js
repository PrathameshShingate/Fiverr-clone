const express = require("express");
const verifyToken = require("../middlewares/auth");
const router = express.Router();
const {
  getOrders,
  intent,
  confirm,
} = require("../controllers/order.controller");

router.get("/get-orders", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/success", verifyToken, confirm);

module.exports = router;
