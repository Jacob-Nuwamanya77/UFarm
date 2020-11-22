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
    const productListing = await Product.findOne({ _id: req.query.product });
    res.render("orderform", { productListing });
  } catch (err) {
    console.log({ message: err });
    res.redirect("/");
  }
});

router.post("/order", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
