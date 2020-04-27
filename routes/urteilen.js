const express = require("express");
const router = express.Router();

/* GET home page */
router.get("routes/urteilen", (req, res, next) => {
  res.render("urteilen");
});

module.exports = router;
