const express = require("express");
const router = express.Router();
const UrbanFarmer = require("../models/urbanFarmer");
const User = require("../models/Users");
const FarmerOne = require("../models/farmerOne");
const Products = require("../models/newProductUpload");
const Order = require("../models/order");

// Routes.
router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      // Access all orders placed to farmers from FO region.
      const ordersPlaced = await Order.find({
        areaFO: req.session.user.username,
      });
      // Access all urban farmers in FO region.
      const urbanFarmers = await UrbanFarmer.find({
        areaFO: req.session.user.username,
      });
      // Access all product uploads in FO region.
      const productUploads = await Products.find({
        areaFO: req.session.user.username,
      });

      let ufTotals;
      if (urbanFarmers.length) {
        ufTotals = urbanFarmers.length;
      } else {
        ufTotals = 0;
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

      res.render("farmerone_dash", { data });
    } catch (err) {
      console.log({ message: err });
    }
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
    const products = await Products.find({
      status: "pending",
      areaFO: req.session.user.username,
    });
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
