const express = require("express");
const router = express.Router();
const Product = require("../models/newProductUpload");

// Routes.
router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    res.render("product", { listings: data });
  } catch (err) {
    console.log({ message: err });
    res.send("Something went wrong with request.");
  }
});

router.get("/order", async (req, res) => {
  try {
    const productListing = await Product.findOne({ _id: req.query.id });
    // Extract payment and delivery options.
    const payment = productListing.payment;
    const delivery = productListing.delivery;
    res.render("orderform", { payment, delivery });
  } catch (err) {
    console.log({ message: err });
    res.redirect("/");
  }
});

module.exports = router;
