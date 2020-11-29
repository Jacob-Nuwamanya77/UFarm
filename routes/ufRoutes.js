const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const UrbanFarmer = require("../models/urbanFarmer");
const Product = require("../models/newProductUpload");

// Multer configurations for uploading files.
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Filter the kind of information that can be upload via file.
const fileFilter = (req, file, callback) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes.
router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      // Use the unique username property to access the name and ward from db.
      const user = await UrbanFarmer.findOne({
        username: req.session.user.username,
      });
      // Use the unique username to access all products listed in the db.
      const listings = await Product.find({
        username: req.session.user.username,
      });
      res.render("urban_dash", { user, listings });
    } catch (err) {
      console.log({ message: err });
      res.status(400).send("Something went wrong with your request.");
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  if (req.session.user) {
    try {
      // Add information to the req.body before processing.
      req.body.filename = req.file.filename;
      req.body.status = "pending";
      req.body.username = req.session.user.username.substr(0, 13);

      // Save data into database.
      const product = await Product(req.body);
      product.save();
      res.redirect("/uf");
    } catch (err) {
      console.log({ message: err });
      res.status(400).send("Something went wrong with image upload");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
