const express = require("express");
const router = express.Router();
const Card = require("../models/Card.js");
// rendering Home Page
router.get("/", (req, res) => {
  console.log(req.user);
  res.render("index", { loggedIn: req.user });
});

// rendering about page
router.get("/about", (req, res, next) => {
  res.render("about", { loggedIn: req.user });
});

// rendering contact page
router.get("/contact", (req, res, next) => {
  res.render("contact", { loggedIn: req.user });
});

// rendering terms and condition page
router.get("/terms", (req, res, next) => {
  res.render("terms", { loggedIn: req.user });
});

//rendering cards Urteilen page
router.get("/urteilen", (req, res, next) => {
  Card.find().then((cards) => {
    res.render("urteilen", { loggedIn: req.user, cards: cards });
  });
});

//seeding route
router.get("/seed/:password", (req, res) => {
  if (req.params.password === process.env.SEED_PW) {
    Card.collection.drop();
    Card.insertMany(cards)
      .then(() => console.log("created cards, will now close connection"))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
