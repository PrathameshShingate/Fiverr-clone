const express = require("express");
const {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} = require("../controllers/conversation.controller.js");
const verifyToken = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

module.exports = router;
