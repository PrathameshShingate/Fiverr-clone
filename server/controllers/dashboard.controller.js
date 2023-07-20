const Gig = require("../models/gig.model");
const Order = require("../models/order.model");
const Conversation = require("../models/conversation.model");

async function getSellerData(req, res, next) {
  try {
    if (req.userId) {
      const gigs = await Gig.find({ userId: req.userId });
      const orders = await Order.find({ buyerId: req.userId });
      const sellerConversations = await Conversation.find({
        sellerId: req.userId,
      });
      const buyerConversations = await Conversation.find({
        buyerId: req.userId,
      });

      return res.status(200).json({
        gigs,
        orders,
        sellerConversations,
        buyerConversations,
      });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = getSellerData;
