const express = require('express');
const passport = require('passport');
const githubStrategy = require('passport-github2');
const User = require('../models/User');
const key = require('./key');
const dotenv = require("dotenv")
dotenv.config();


const authController = require('../controller/authController');

const router = express.Router();

passport.use(new githubStrategy({
  clientID: key.github.clientID,
  clientSecret:  key.github.clientSecret,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken,refreshToken, profile, done) => {
  console.log(profile)
  User.findOrCreate({githubID: profile.id}, (err, user) =>{
    return done(err,user);
  });
}));

router.get('/login', authController.login);
router.get('/github',passport.authenticate('github',{scope: ['profile']}));

router.get('/github/callback',passport.authenticate('github'),(req,res) => {
  res.send('you have authenticated');
});

router.get('/logout')

module.exports = router;
