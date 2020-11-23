const express = require("express");
const router = express.Router();
const UrbanFarmer = require("../models/urbanFarmer");
const User = require("../models/Users");
const FarmerOne = require("../models/farmerOne");
const Products = require("../models/newProductUpload");

// Routes.
router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("farmerone_dash");
  } else {
    res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.render("register_urban");
  } else {
    res.redirect("/login");
  }
});

router.get("/approval", async (req, res) => {
  if (req.session.user) {
    const products = await Products.find({ status: "pending" });
    res.render("pending_approval", { products });
  } else {
    res.redirect("/login");
  }
});

router.get("/approval/complete", async (req, res) => {
  try {
    const approved = { status: "active" };
    await Products.findOneAndUpdate({ _id: req.query.product }, approved);
    res.redirect("/fo/approval");
  } catch (err) {
    console.log({ message: err });
    res.redirect("/fo");
  }
});

// Create new user account.
router.post("/register", async (req, res) => {
  if (req.session.user) {
    try {
      // Extract relevant data about the user from the db.
      let farmeroneData = await FarmerOne.findOne({
        username: req.session.user.username,
      });

      // Add data to the body before it is processed.
      req.body.role = "urbanfarmer";
      req.body.LC = farmeroneData.LC;
      req.body.areaAO = farmeroneData.areaAO;
      req.body.areaFO = req.session.user.username;

      // Create document and save.
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
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
