const createError = require("../utils/createError.js");
const Message = require("../models/message.model.js");
const Conversation = require("../models/conversation.model.js");
const User = require("../models/user.model.js");

async function createMessage(req, res, next) {
  const user = await User.findOne({ _id: req.userId });

  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: user.isSeller,
          readByBuyer: !user.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getMessages(req, res, next) {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = { createMessage, getMessages };
