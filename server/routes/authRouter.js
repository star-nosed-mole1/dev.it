const express = require("express");
const passport = require("passport");
const githubStrategy = require("passport-github2");
const User = require("../models/User");
const key = require("./key");
const dotenv = require("dotenv");
const GoogleStrategy = require('passport-google-oauth20');

dotenv.config();

const authController = require("../controller/authController");

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null,user);
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
        const newUser = await User.create({ githubID: profile.id });
        done(null, newUser);
      }
    }
  )
);

passport.use(new GoogleStrategy({
  clientID: key.google.clientID,
  clientSecret: key.google.clientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  const foundUser = await User.find({ githubID: profile.id });
  if (foundUser) {
    done(null, foundUser);
  } else {
    const newUser = await User.create({ githubID: profile.id });
    done(null, newUser);
  }
}));


router.get("/login", authController.login);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get("/github/callback", passport.authenticate("github"), authController.login, (req, res) => {
  if (process.env.npm_lifecycle_event === 'dev') res.redirect('http://localhost:8080/')
  res.redirect("/");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google"), authController.login, (req, res) => {
  if (process.env.npm_lifecycle_event === 'dev') res.redirect('http://localhost:8080/')
  res.redirect("/");
});

router.get("/logout");

module.exports = router;
