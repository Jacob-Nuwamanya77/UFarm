const express = require("express");
const router = express.Router();
const FarmerOne = require("../models/farmerOne");
const User = require("../models/Users");

// Routes.
router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("agric_dash");
  } else {
    res.redirect("/login");
  }
});

// Request registration page.
router.get("/register", (req, res) => {
  if (req.session.user) {
    res.render("register_fo");
  } else {
    res.redirect("/login");
  }
});

// Receive registration details.
router.post("/register", async (req, res) => {
  if (req.session.user) {
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
  } else {
    res.redirect("/login");
  }
});

// Request data on Farmer ones in database.
router.get("/farmerones", async (req, res) => {
  if (req.session.user) {
    try {
      let data = await FarmerOne.find();
      res.render("farmeronedata", { farmers: data });
    } catch (err) {
      console.log({ message: err });
      res.status(400).send("Something went wrong with request.");
    }
  } else {
    res.redirect("/login");
  }
});

// Update data on Farmer one in database.
router.post("/farmerones/update", async (req, res) => {
  if (req.session.user) {
    try {
      await FarmerOne.findOneAndUpdate({ _id: req.query.id }, req.body);
      res.redirect("/ao/farmerones");
    } catch (err) {
      console.log({ message: err });
      res.status(400).send("Something went wrong with request.");
    }
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
