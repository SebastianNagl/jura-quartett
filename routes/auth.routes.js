const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// Roles, we nee to pass the middleware 'checkAdmin' to render an admin page if we will.
// const checkGuest = checkRoles("GUEST");
// const checkAdmin = checkRoles("ADMIN");

// function checkRoles(role) {
//   return function (req, res, next) {
//     if (req.isAuthenticated() && req.user.role === role) {
//       return next();
//     } else {
//       res.redirect("/login");
//     }
//   };
// }

// Signup
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

//This route needs to receive the data from the form and log the user in.
router.post("/signup", (req, res, next) => {
  const { username, password, name, age } = req.body;
  if (age < 18) {
    res.render("auth/signup", {
      message:
        "Sorry, Sie müssen mindestens 18 Jahre alt sein, um diese Website zu registrieren.",
    });
    return;
  }
  if (password.length < 6) {
    res.render("auth/signup", {
      message: "Passwörter müssen mindestens 6 Zeichen lang sein.",
    });
    return;
  }
  if (username === "") {
    res.render("auth/signup", {
      message: "Ihre E-Mail Adresse kann nicht leer sein.",
    });
    return;
  }
  User.findOne({ username: username }).then((user) => {
    if (user != null) {
      res.render("auth/signup", { message: "Ihre E-Mail existiert bereits." });
      return;
    }
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    User.create({ username: username, password: hash, age: age, name: name })
      .then((newUser) => {
        req.login(newUser, (err) => {
          if (err) {
            next(err);
          } else {
            res.redirect("/");
          }
        });
      })
      .catch((err) => {
        next(err);
      });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { errorMessage: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/private-page",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/private", { user: req.user });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/private-page",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res, next) => {
  res.logout();
  res.redirect("/");
});

module.exports = router;
