//jshint eversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const request = require("request");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-james:2137@cluster0.yilz1.mongodb.net/blogDBproject", {
  useNewUrlParser: true
});

// Sign Up for Discount in Footer
// Post your First Name & Email to Mailchimp API

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us5.api.mailchimp.com/3.0/lists/c19f4b2c3c";

const options = {
  method: "POST",
  auth: "jimmy1:87adacc8015744d86516efece736277d-us5"
}

const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
    res.redirect("success");
  } else {
    res.redirect("failure");
  }

  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});


// Get Routes

// Home
app.get("/", function(req, res) {
  res.render("home");
});

// Products
app.get("/products", function(req, res) {
  res.render("products");
});

// Why Cavode
app.get("/why-cavode", function(req, res) {
  res.render("why-cavode");
});

// Contact Us
app.get("/contact-us", function(req, res) {
  res.render("contact-us");
});

// Sucees
app.get("/success", function(req, res) {
  res.render("success");
});

// Failure
app.get("/failure", function(req, res) {
  res.render("failure");
});

// Submitted
app.get("/submitted", function(req, res) {
  res.render("submitted");
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
