const express = require("express");
const router = express.Router();

/* GET About Us page */
router.get("routes/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
