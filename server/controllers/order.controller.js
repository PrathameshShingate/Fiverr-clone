const Order = require("../models/order.model");
const Gig = require("../models/gig.model");
const Stripe = require("stripe");

async function intent(req, res, next) {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    // img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
    category: gig.category,
    deliveryTime: gig.deliveryTime,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({
      buyerId: req.userId,
      isCompleted: true,
    });

    res.status(200).json({ orders: orders });
  } catch (err) {
    next(err);
  }
}

async function confirm(req, res, next) {
  try {
    await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
}

module.exports = { intent, getOrders, confirm };
