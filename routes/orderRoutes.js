const express = require("express");
const router = express.Router();

//Middlewares.
router.get("/", (req, res) => {
	res.render("orderform");
});

module.exports = router;
