const express = require("express");
const router = express.Router();
const Product = require("../models/newProductUpload");
const UrbanFarmer = require("../models/urbanFarmer");
const Order = require("../models/order");

// Routes.
router.get("/", async (req, res) => {
  try {
    const data = await Product.find({ status: "active" });
    res.render("product", { listings: data });
  } catch (err) {
    console.log({ message: err });
    res.send("Something went wrong with request.");
  }
});

router.get("/order", async (req, res) => {
  try {
    const productListing = await Product.findOne({ _id: req.query.product });
    res.render("orderform", { productListing });
  } catch (err) {
    console.log({ message: err });
    res.redirect("/");
  }
});

router.post("/order", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.query.product });
    // Create object to pass into update function.
    let newQty = {};
    // Calculate the difference.
    let difference = parseInt(product.quantity) - parseInt(req.body.quantity);
    if (difference == 0) {
      newQty.quantity = "N/A";
    } else {
      newQty.quantity = difference;
    }

    // Update the data base content of the quantity field only.
    await Product.findOneAndUpdate({ _id: req.query.product }, newQty);

    // Extract data from the uf that is important for metrics.
    let userName = `UF-${product.phone.substr(0, 10)}`;
    let UF = await UrbanFarmer.findOne({ username: userName });

    // Add data to the req.body object before processing.
    req.body.LC = UF.LC;
    req.body.areaAO = UF.areaAO;
    req.body.areaFO = UF.areaFO;
    req.body.UF = userName;
    req.body.status = "pending";

    // Process data and save to db.
    await Order(req.body).save();
    res.redirect("/");
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
