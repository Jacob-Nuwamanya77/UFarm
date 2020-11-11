// Import functionality required.
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Import routes.
const loginRoutes = require("./routes/loginRoutes");
const aoRoutes = require("./routes/aoRoutes");
const foRoutes = require("./routes/foRoutes");
const farmerOne = require("./models/farmerOne");
const urbanFarmer = require("./models/urbanFarmer");
const PublicUser = require("./models/publicUsers");

// Express configs.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

//Middlewares.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Passport local authentication.
passport.use(PublicUser.createStrategy());
passport.serializeUser(PublicUser.serializeUser());
passport.deserializeUser(PublicUser.deserializeUser());

passport.use(farmerOne.createStrategy());
passport.serializeUser(farmerOne.serializeUser());
passport.deserializeUser(farmerOne.deserializeUser());

passport.use(urbanFarmer.createStrategy());
passport.serializeUser(urbanFarmer.serializeUser());
passport.deserializeUser(urbanFarmer.deserializeUser());

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
app.use("/", loginRoutes);
app.use("/ao", aoRoutes);
app.use("/fo", foRoutes);

// Undefined routes.
app.get("*", (req, res) => {
  res.send("Invalid request");
});

// Listening on port 3000.
app.listen(3000);
