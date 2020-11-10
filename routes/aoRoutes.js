const express = require("express");
const farmerOne = require("../models/farmerOne");
const router = express.Router();
const FarmerOne = require("../models/farmerOne");

// Routes.
router.get("/", (req, res) => {
  res.render("agric_dash");
});

router.get("/register", (req, res) => {
  res.render("register_fo");
});

router.post("/register", async (req, res) => {
  try {
    // Construct document object.
    const farmerOne = new FarmerOne({
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      nin: req.body.nin,
      ward: req.body.ward,
      horticulture: req.body.horticulture,
      poultry: req.body.poultry,
      diary: req.body.diary,
      ID: req.body.ID,
      registrationDate: req.body.registrationDate,
      residence: req.body.residence,
      since: req.body.since,
      directions: req.body.directions,
    });

    await farmerOne.save(() => {
      res.redirect("/ao");
    });
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
