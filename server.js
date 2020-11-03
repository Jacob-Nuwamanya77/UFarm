//Import express module functionality.
const express = require("express");
const app = express();

//Express configuration.
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/public/home.html`);
});
app.get("/order", (req, res) => {
	res.sendFile(`${__dirname}/public/orderform.html`);
});
app.get("/urban", (req, res) => {
	res.sendFile(`${__dirname}/public/register_urban.html`);
});
app.get("/farmer", (req, res) => {
	res.sendFile(`${__dirname}/public/register_fo.html`);
});

//Port
app.listen(3000);
