const express = require("express");
const router = express.Router();

// Routes.
router.get("/", (req, res) => {
  res.render("farmerone_dash");
});

router.get("/register", (req, res) => {
  res.render("register_urban");
});

router.post("/register", async (req, res) => {});

module.exports = router;
