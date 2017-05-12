/*jshint esversion:6*/

const express = require('express');
const login = express.Router();
const {Login} = require('../../models');

//passport
const passport = require('passport');

// POST
login.post('/', passport.authenticate('local'), (req, res) => {
  res.json({success:true});
});

module.exports = login;