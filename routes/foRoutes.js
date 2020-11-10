const express = require("express");
const router = express.Router();
const UrbanFarmer = require("../models/urbanFarmer");

// Routes.
router.get("/", (req, res) => {
  res.render("farmerone_dash");
});

router.get("/register", (req, res) => {
  res.render("register_urban");
});

router.post("/register", async (req, res) => {
  try {
    // Construct document object.
    const urbanFarmer = new UrbanFarmer({
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
    });

    await urbanFarmer.save(() => {
      res.redirect("/fo");
    });
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
