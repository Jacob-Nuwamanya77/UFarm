const express = require("express");
const router = express.Router();

//Middlewares.
router.get("/", (req, res) => {
	res.render("home");
});

module.exports = router;
