const express = require("express");
const path = require("path");
const orderRoutes = require("./routes/orderRoutes");
const homeRoutes = require("./routes/homeRoutes");
const app = express();

// Express configs.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//Middlewares.
app.use(express.static("public"));
app.use("/", homeRoutes);
app.use("/orders", orderRoutes);

// Routes.
app.listen(3000);
