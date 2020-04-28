const express = require("express");
const router = express.Router();

/* GET home page */
router.get("routes/terms", (req, res, next) => {
  res.render("terms");
});

module.exports = router;
