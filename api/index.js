/*jshint esversion:6*/

const express = require('express');
const Router = express.Router();

Router.use('/users', require('./users'));
// Router.use('/cards', require('./cards'));

module.exports = Router;