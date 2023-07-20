const createError = require("../utils/createError.js");
const Conversation = require("../models/conversation.model.js");
const User = require("../models/user.model.js");

async function createConversation(req, res, next) {
  const user = await User.findOne({ _id: req.userId });
  const newConversation = new Conversation({
    id: user.isSeller ? user._id + req.body.to : req.body.to + user._id,
    sellerId: user.isSeller ? user._id : req.body.to,
    buyerId: user.isSeller ? req.body.to : user._id,
    readBySeller: user.isSeller,
    readByBuyer: !user.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function updateConversation(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.userId });

    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(user.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getSingleConversation(req, res, next) {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getConversations(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.userId });
    const conversations = await Conversation.find(
      user.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  createConversation,
  updateConversation,
  getSingleConversation,
  getConversations,
};
