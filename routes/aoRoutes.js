const express = require("express");
const router = express.Router();
const FarmerOne = require("../models/farmerOne");
const User = require("../models/Users");
const Order = require("../models/order");
const Products = require("../models/newProductUpload");
const UrbanFarmer = require("../models/urbanFarmer.js");

// Routes.
router.get("/", async (req, res) => {
  if (req.session.user) {
    // Access all orders placed to farmers from AO region.
    const ordersPlaced = await Order.find({
      areaAO: req.session.user.username,
    });
    // Access all urban farmers in AO region.
    const urbanFarmers = await UrbanFarmer.find({
      areaAO: req.session.user.username,
    });
    // Access all product uploads in AO region.
    const productUploads = await Products.find({
      areaAO: req.session.user.username,
    });
    // Sort urban farmers by LC.
    let UFLC1 = [],
      UFLC2 = [],
      UFLC3 = [],
      UFLC4 = [];
    let ufTotals;
    if (urbanFarmers.length) {
      sortData(urbanFarmers, [UFLC1, UFLC2, UFLC3, UFLC4]);
      ufTotals = {
        UFLC1: UFLC1.length,
        UFLC2: UFLC2.length,
        UFLC3: UFLC3.length,
        UFLC4: UFLC4.length,
      };
    }
    // Sort orders placed.
    let OLC1 = [],
      OLC2 = [],
      OLC3 = [],
      OLC4 = [];
    let orderTotals;
    if (ordersPlaced.length) {
      sortData(ordersPlaced, [OLC1, OLC2, OLC3, OLC4]);
      orderTotals = {
        OLC1: OLC1.length,
        OLC2: OLC2.length,
        OLC3: OLC3.length,
        OLC4: OLC4.length,
      };
    }
    // Sort uploads.
    let UPLC1 = [],
      UPLC2 = [],
      UPLC3 = [],
      UPLC4 = [];
    let uploadTotals;
    if (productUploads.length) {
      sortData(productUploads, [UPLC1, UPLC2, UPLC3, UPLC4]);
      uploadTotals = {
        UPLC1: UPLC1.length,
        UPLC2: UPLC2.length,
        UPLC3: UPLC3.length,
        UPLC4: UPLC4.length,
      };
    }
    let data = { ufTotals, orderTotals, uploadTotals };
    res.render("agric_dash", { data });
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
      // Add data to the body before its processed.
      req.body.role = "farmerone";
      req.body.status = "active";
      req.body.areaAO = req.session.user.username;

      // Create document and save.
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

// Helper functions - Sort the data into Arrays
function sortData(source, options) {
  source.forEach((element) => {
    if (element.LC == "1") {
      options[0].push(element);
    } else if (element.LC == "2") {
      options[1].push(element);
    } else if (element.LC == "3") {
      options[2].push(element);
    } else if (element.LC == "4") {
      options[3].push(element);
    }
  });
}
