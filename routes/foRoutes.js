const express = require("express");
const router = express.Router();
const UrbanFarmer = require("../models/urbanFarmer");
const User = require("../models/Users");

// Routes.
router.get("/", (req, res) => {
  res.render("farmerone_dash");
});

router.get("/register", (req, res) => {
  res.render("register_urban");
});

// Create new user account.
router.post("/register", async (req, res) => {
  try {
    // Add a role before the body is processed.
    req.body.role = "urbanfarmer";
    let urbanfarmerData = UrbanFarmer(req.body);
    let loginData = User(req.body);
    urbanfarmerData.save();
    await User.register(loginData, req.body.password, (err) => {
      if (err) {
        console.log({ message: err });
        res.status(400).send("Something went wrong with registration.");
      } else {
        res.redirect("/fo");
      }
    });
  } catch (err) {
    console.log({ message: err });
    res.status(400).send("Something went wrong with registration.");
  }
});

module.exports = router;
