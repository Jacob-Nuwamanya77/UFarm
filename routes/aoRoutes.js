const express = require("express");
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

module.exports = router;
