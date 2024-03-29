const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/message.controller");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

module.exports = router;
