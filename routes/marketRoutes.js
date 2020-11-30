const express = require("express");
const router = express.Router();
const Product = require("../models/newProductUpload");
const UrbanFarmer = require("../models/urbanFarmer");
const Order = require("../models/order");

// Routes.
router.get("/", async (req, res) => {
  try {
    // Extract only approved products for displaying.
    const data = await Product.find({ status: "active" });

    // Set default page and page size values and directional values for page navigation.
    let requested_page = req.query.page ? parseInt(req.query.page) : 1;
    let previous_page, next_page;
    let page_size = 8;
    if (!req.query.page) {
      next_page = requested_page + 1;
      previous_page = requested_page;
    } else {
      if (req.query.next) {
        next_page = requested_page + 1;
        previous_page = requested_page - 1;
      } else if (req.query.prev) {
        next_page = requested_page + 1;
        previous_page = requested_page - 1 <= 0 ? 1 : requested_page - 1;
      }
    }

    let limits = { next_page, previous_page };
    res.render("product", { listings: data, limits });
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
