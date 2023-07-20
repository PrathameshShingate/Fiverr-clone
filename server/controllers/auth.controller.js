const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email, userID) => {
  return jwt.sign({ email, userID }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

async function signUp(req, res) {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = new User({
        email: email,
        password: hashedPass,
      });

      const user = await newUser.save();

      return res.status(201).json({
        user: { id: user?._id, email: user?.email },
        jwt: createToken(email, user._id),
      });
    }
    res.status(400).send("Email & Password Required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email });
      if (!user) return next(createError(404, "User not found"));

      const validated = await bcrypt.compare(password, user.password);
      !validated && res.status(401).json("password doesn't match");

      return res.status(201).json({
        user: { id: user?._id, email: user?.email },
        jwt: createToken(email, user._id),
      });
    }
    return res.status(400).send("Email & Password Required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getUserInfo(req, res, next) {
  try {
    if (req?.userId) {
      const user = await User.findOne({ _id: req.userId });
      const { password, ...others } = user._doc;
      return res.status(200).json({ user: others });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function setUserInfo(req, res, next) {
  try {
    if (req?.userId) {
      const { userName, fullName, description, profilePic } = req.body;

      if (userName && fullName && description && profilePic) {
        const userNameValid = await User.findOne({ username: userName });

        if (userNameValid) {
          return res.status(200).json({ userNameError: true });
        } else {
          const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {
              username: userName,
              fullname: fullName,
              description,
              profilePic: profilePic,
              isProfileInfoSet: true,
            },
            { new: true }
          );
          const { password, ...others } = updatedUser._doc;
          return res.status(200).json(others);
        }
      } else {
        return res
          .status(400)
          .send("Username, Full name & Description should be included");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function setUserSellerOrBuyer(req, res, next) {
  try {
    if (req?.userId) {
      const { isSeller } = req.body;
      const updated_user = await User.findByIdAndUpdate(
        req.userId,
        {
          isSeller,
        },
        { new: true }
      );
      return res.status(200).json(updated_user);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}
module.exports = {
  signUp,
  login,
  getUserInfo,
  setUserInfo,
  setUserSellerOrBuyer,
};
