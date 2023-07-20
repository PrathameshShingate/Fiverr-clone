const createError = require("../utils/createError");
const Review = require("../models/review.model.js");
const User = require("../models/user.model");
const Gig = require("../models/gig.model");

async function createReview(req, res, next) {
  const user = await User.findOne({ _id: req.userId });

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
    profileImage: user.profilePic,
    username: user.username,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
}

async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

module.exports = { createReview, getReviews, deleteReview };
