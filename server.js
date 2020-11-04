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
app.use("/orders", orderRoutes);
app.use("/", homeRoutes);

// Routes.
app.listen(3000);
