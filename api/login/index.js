/*jshint esversion:6*/

const express = require('express');
const login = express.Router();
const {Login} = require('../../models');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// POST
login.post('/', passport.authenticate('local', {
  successRedirect: '/api/users',
  failureRedirect: '/api/cards'
}));

module.exports = login;