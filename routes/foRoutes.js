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
      var ordersArr = [];
      let wards = "";
      if (ordersPlaced.length) {
        for (let i = 0; i < ordersPlaced.length; i++) {
          let incomingWard = ordersPlaced[i].ufward;
          if (wards.includes(incomingWard)) {
            // Find the object in ordersArr and increase the count property.
            for (let j = 0; j < ordersArr.length; j++) {
              if (ordersArr[j].ward == incomingWard) {
                ordersArr[j].count++;
                break;
              }
            }
          } else {
            ordersArr.push({ ward: incomingWard, count: 1 });
            wards += incomingWard;
          }
        }
      }
      // Sort Array in order of big to small.

      function compare(a, b) {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        return 0;
      }
      const ordersSorted = ordersArr.sort(compare);

      // Sort uploads.
      var uploadsArr = [];
      let uploadWard = "";
      if (productUploads.length) {
        for (let i = 0; i < productUploads.length; i++) {
          let incomingWard = productUploads[i].ward;
          if (uploadWard.includes(incomingWard)) {
            // Find the object in uploadsArr and increase the count property.
            for (let j = 0; j < uploadsArr.length; j++) {
              if (uploadsArr[j].ward == incomingWard) {
                uploadsArr[j].count++;
                break;
              }
            }
          } else {
            uploadsArr.push({ ward: incomingWard, count: 1 });
            uploadWard += incomingWard;
          }
        }
      }
      // Sort array
      let uploadsSorted = uploadsArr.sort(compare);
      let data = { ufTotals, ordersSorted, uploadsSorted };

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
