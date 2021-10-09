const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
//COMPONENTS
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
//DATABASE
const db = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "ryanotaydemusa14",
    database: "facerecognitionbraindb",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// SIGNIN
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//PROFILE AND ID
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
// IMAGE ENTRIES
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// LOCALHOST
app.listen(4000, () => {
  console.log("app is running");
});
