const express = require("express");
const router = express.Router();

// Routes.
router.get("/", (req, res) => {
  res.render("urban_dash");
});

module.exports = router;
