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

module.exports = router;
