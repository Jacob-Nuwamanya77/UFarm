//Import express module functionality.
const express = require("express");
const app = express();

//Express configuration.
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/public/home.html`);
});

//Port
app.listen(3000);
