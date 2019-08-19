const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const port = process.env.port || 3000;

//database setting
var db_url =
  "mongodb+srv://admin1234:admin1234@cluster0-pxexl.mongodb.net/Rent-app?retryWrites=true&w=majority";
mongoose.connect(db_url, { useNewUrlParser: true });

mongoose.connection.on("error", function(err) {
  console.log(err);
  console.log("Could not connect to mongodb");
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//importing model
const User = require("./model/user");
const Apartment = require("./model/apartment");

//router link
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/login", (req, res) => {
  let uName = req.body.username;
  let pWord = req.body.password;
  //replace the code below with validation and allow user to login
  console.log(uName);
  console.log(pWord);
  res.render("index");
});
app.post("/message", (req, res) => {
  //store  data in database
  let name = req.body.name;
  let mail = req.body.mail;
  let subject = req.body.subject;
  let msg = req.body.message;
  //replace the code below with validation
  console.log(name);
  console.log(mail);
  console.log(subject);
  console.log(msg);

  res.render("index");
});
app.get("/search", (req, res) => {
  console.log("search");
  res.render("search");
});
app.get("/signup", (req, res) => {
  //console.log("signup");
  res.render("signup");
});

app.get("/apartment", (req, res) => {
  console.log("apartment");
  res.render("apartment");
});

app.post("/signup", (req, res) => {
  let fName = req.body.first_name;
  let lName = req.body.last_name;
  let email = req.body.email;
  let cNum = req.body.contact_number;
  let address = req.body.Address;
  let city = req.body.city;
  let zip = req.body.zip;
  let password = req.body.password;
  const user = new User({
    firstName: fName,
    lastName: lName,
    email: email,
    password: password,
    contact: cNum,
    address: address,
    city: city
  });

  user.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: error });
    } else {
      console.log("success");
      res.render("index");
    }
  });
  //console.log(fName +","+ lName +","+ email +","+ cNum +","+ address +","+ city +","+ zip);
  //res.end();
});
app.post("/apartment", (req, res) => {
  let fName = req.body.first_name;
  let lName = req.body.last_name;
  let house = req.body.house;
  let rent = req.body.rent;
  let address = req.body.Address;
  let city = req.body.city;
  let zip = req.body.zip;
  const apartment = new Apartment({
    firstName: fName,
    lastName: lName,
    nameOfHouse: house,
    rent: rent,
    address: address,
    city: city,
    zip: zip
  });

  // Store in database
  apartment.save((error, data) => {
    if (error) {
      return res.status(401).json({ error: error });
    } else {
      console.log("Apartment saved");
      res.render("index");
    }
  });
});

app.get("/dashboard", async (req, res) => {
  const apartment = await Apartment.find({});
  const user = await User.find({});
  //  const apartment = await User.find({});
  try {
    res.render("dashboard", {
      title: "dashboard",
      users: user,
      apartments: apartment
    });
  } catch (error) {
    console.log(error);
  }
});

//test

app.listen(port, () => {
  console.log(`Application is running in ${port}`);
});
