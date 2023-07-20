const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const gigRoutes = require("./routes/gig.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const response = require("./middlewares/response");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(response);

mongoose.set("strictQuery", true);
const connection = async () => {
  try {
    await mongoose.connect(process.env.MongoDB);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("*", (req, res) => {
  res.status(400).json({
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  connection();
  console.log(`server is running on port ${PORT}`);
});
