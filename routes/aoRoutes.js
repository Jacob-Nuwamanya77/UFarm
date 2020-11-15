const express = require("express");
const router = express.Router();
const FarmerOne = require("../models/farmerOne");

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
    let user = FarmerOne(req.body);
    await FarmerOne.register(user, req.body.password, (err) => {
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
