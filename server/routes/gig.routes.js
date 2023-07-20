const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const {
  addGig,
  getUserGigs,
  getGig,
  editGig,
  getGigs,
  getUserGigsById,
  deleteGig,
} = require("../controllers/gig.controllers");

router.get("/get-user-gigs", verifyToken, getUserGigs);
router.get("/get-user-gigs-by-id/:id", verifyToken, getUserGigsById);
router.get("/get-gig-data/:gigId", getGig);
router.post("/add", verifyToken, addGig);
router.put("/edit-gig/:gigId", verifyToken, editGig);
router.delete("/delete-gig/:id", verifyToken, deleteGig);
router.get("/", getGigs);

module.exports = router;
