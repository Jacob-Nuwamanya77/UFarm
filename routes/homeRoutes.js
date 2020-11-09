const express = require("express");
const router = express.Router();

// Import the model.
const PublicUser = require("../models/publicUsers");

// ROUTES
router.get("/", (req, res) => {
  res.render("home");
});

router.post("/", async (req, res) => {
  try {
    const user = new PublicUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      userName: req.body.userName,
      password: req.body.password,
    });
    user.save().then(
      () => {
        res.redirect("/");
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (err) {
    console.log({ message: err });
  }
});

module.exports = router;
