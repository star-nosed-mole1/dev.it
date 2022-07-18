const express = require("express");
const passport = require("passport");
const githubStrategy = require("passport-github2");
const User = require("../models/User");
const key = require("./key");
const dotenv = require("dotenv");

dotenv.config();

const authController = require("../controller/authController");

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null,user)
  // User.findById(id).then((user) => {
  //   done(null, user);
  // });
});

passport.use(
  new githubStrategy(
    {
      clientID: key.github.clientID,
      clientSecret: key.github.clientSecret,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.find({ githubID: profile.id });
      if (foundUser) {
        done(null, foundUser);
      } else {
        const newUser = await User.create({ githubIDL: profile.id });
        done(null, newUser);
      }
    }
  )
);

router.get("/login", authController.login);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get("/github/callback", passport.authenticate("github"), authController.login, (req, res) => {
  res.send("LOGIN FREELY");
});

router.get("/logout");

module.exports = router;
