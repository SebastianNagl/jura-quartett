const express = require("express");
const router = express.Router();
const Cards = require("../models/Card.js");
// rendering Home Page
router.get("/", (req, res) => {
  res.render("index");
});

// rendering about page
router.get("/routes/about", (req, res, next) => {
  res.render("about");
});

// rendering contact page
router.get("/routes/contact", (req, res, next) => {
  res.render("contact");
});

// rendering terms and condition page
router.get("/routes/terms", (req, res, next) => {
  res.render("terms");
});

//rendering  Urteilen page
router.get("/routes/urteilen", (req, res, next) => {
  Cards.find().then((cards) => {
    res.render("urteilen", { cards: cards });
  });
});

module.exports = router;
