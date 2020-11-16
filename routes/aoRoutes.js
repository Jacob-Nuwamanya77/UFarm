const express = require("express");
const router = express.Router();
const FarmerOne = require("../models/farmerOne");
const User = require("../models/Users");

// Routes.
router.get("/", (req, res) => {
  res.render("agric_dash");
});

// Request registration page.
router.get("/register", (req, res) => {
  res.render("register_fo");
});

// Receive registration details.
router.post("/register", async (req, res) => {
  try {
    // Add a role to the body before its processed.
    req.body.role = "farmerone";
    let farmeroneData = FarmerOne(req.body);
    let loginData = User(req.body);
    farmeroneData.save();
    await User.register(loginData, req.body.password, (err) => {
      if (err) {
        console.log({ message: err });
        res.status(400).send("Something went wrong with registration.");
      } else {
        res.redirect("/ao");
      }
    });
  } catch (err) {
    console.log({ message: err });
    res.status(400).send("Something went wrong with registration.");
  }
});

// Request data on Farmer ones in database.
router.get("/farmerones", async (req, res) => {
  try {
    let data = await FarmerOne.find();
    res.render("farmeronedata", { farmers: data });
  } catch (err) {
    console.log({ message: err });
    res.status(400).send("Something went wrong with request.");
  }
});

// Update data on Farmer one in database.
router.post("/farmerones/update", async (req, res) => {
  try {
    await FarmerOne.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/ao/farmerones");
  } catch (err) {
    console.log({ message: err });
    res.status(400).send("Something went wrong with request.");
  }
});
module.exports = router;
