const Gig = require("../models/gig.model");
const User = require("../models/user.model");

async function addGig(req, res, next) {
  try {
    if (req.query) {
      const {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
        shortDesc,
        images,
      } = req.query;

      const gigCreatedBy = await User.findById(req.userId);

      const newGig = new Gig({
        title,
        description,
        deliveryTime: parseInt(time),
        category,
        features,
        price: parseInt(price),
        shortDesc,
        revisions: parseInt(revisions),
        images,
        userId: req.userId,
        username: gigCreatedBy.username,
        profileImage: gigCreatedBy.profilePic,
        email: gigCreatedBy.email,
        fullName: gigCreatedBy.fullname,
      });

      const gig = await newGig.save();

      return res.status(201).json(gig).send("Successfully added the gig.");
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getUserGigs(req, res, next) {
  try {
    const gigs = await Gig.find({ userId: req.userId });
    return res.status(200).json({ gigs: gigs });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getUserGigsById(req, res, next) {
  try {
    const gigs = await Gig.find({ userId: req.params.id });
    return res.status(200).json({ gigs: gigs });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function getGig(req, res, next) {
  try {
    if (req.params.gigId) {
      const gig = await Gig.findOne({ _id: req.params.gigId });
      if (!gig) res.status(401).send("gig does not exist");

      return res.status(200).json(gig);
    }
    return res.status(400).send("gig id is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

async function editGig(req, res, next) {
  try {
    if (req.query) {
      const {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
        shortDesc,
        images,
      } = req.query;

      await Gig.findByIdAndUpdate(
        req.params.gigId,
        {
          title,
          description,
          deliveryTime: parseInt(time),
          category,
          features,
          price: parseInt(price),
          shortDesc,
          revisions: parseInt(revisions),
          images,
          userId: req.userId,
        },
        { new: true }
      );

      return res.status(200).send("Successfully Eited the gig.");
    }

    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getGigs(req, res, next) {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { category: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function deleteGig(req, res, next) {
  try {
    await Gig.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send("Gig successfully deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addGig,
  getUserGigs,
  getGig,
  editGig,
  getGigs,
  getUserGigsById,
  deleteGig,
};
