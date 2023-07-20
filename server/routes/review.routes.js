const express = require("express");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/review.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);

module.exports = router;
