const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const homeRoutes = require("./routes/homeRoutes");
const urbanRoutes = require("./routes/foRoutes");
// Express configs.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//Middlewares.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Database connections.
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Test connection to mongo.
let db = mongoose.connection;
db.on("open", () => console.log("Connected to Mongo"));
db.on("error", (err) => console.log(err));

// ROUTES.
app.use("/", homeRoutes);
app.use("/urban", urbanRoutes);
// Listening on port 3000.
app.listen(3000);
