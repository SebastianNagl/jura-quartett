const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const cards = require("../content.json");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/seed/:password", (req, res) => {
  if (req.params.password === process.env.SEED_PW) {
    Card.collection.drop();
    Card.insertMany(cards)
      .then(() => console.log("created cards, will now close connection"))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
