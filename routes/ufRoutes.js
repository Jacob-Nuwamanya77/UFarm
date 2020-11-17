const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer configurations for uploading files.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
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
router.get("/", (req, res) => {
  res.render("urban_dash");
});

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.redirect("/uf");
  } catch (err) {
    console.log({ message: err });
    res.status(400).send("Something went wrong with image upload");
  }
});

module.exports = router;
