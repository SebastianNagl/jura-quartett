const express = require("express");
const router = express.Router();
const Card = require("../models/Card.js");
const cards = require("../content.json");

// rendering Home Page
router.get("/", (req, res) => {
  // console.log(req.user);
  res.render("index", { loggedIn: req.user, home: true });
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

// rendering shopping cart
router.get("/kaufen", (req, res, next) => {
  res.render("kaufen");
});

//rendering cards Fälle page
router.get("/faelle", (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.render("faelle", { loggedIn: req.user, cards: cards, faelle: true });
    })
    .catch((err) => console.log("error loading fälle ", err));
});

//rendering detail Fall page
router.post("/faelle/", (req, res, next) => {
  Card.findById(req.body.cardId)
    .then((card) => {
      //color picker logic:
      let color;
      switch (card.Kategorie) {
        case 1:
          color = "6E0000";
          break;
        case 2:
          color = "002E75";
          break;
        case 3:
          color = "004A27";
          break;
        case 4:
          color = "580052";
          break;
        case 5:
          color = "7D7D7C";
          break;
        case 6:
          color = "C34D00";
          break;
        case 7:
          color = "000000";
          break;
        case 8:
          color = "CEAB01";
          break;
      }
      res.render("fall", { card: card, color: color });
    })
    .catch((err) => {
      console.log("error fetching card info: ", err);
    });
});

//regeln route
router.get("/regeln", (req, res, next) => {
  res.render("regeln", { regeln: true });
});

//team route
router.get("/team", (req, res, next) => {
  res.render("team", { team: true });
});

//seeding route
router.get("/seed/:password", (req, res) => {
  if (req.params.password === process.env.SEED_PW) {
    Card.collection.drop();
    Card.insertMany(cards)
      .then(() => console.log("created cards, will now close connection"))
      .catch((err) => console.log(err))
      .finally(() => res.redirect("/"));
  }
});

module.exports = router;
