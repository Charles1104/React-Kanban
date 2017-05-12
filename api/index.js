/*jshint esversion:6*/

const express = require('express');
const Router = express.Router();

Router.use('/users', require('./users'));
Router.use('/cards', require('./cards'));
Router.use('/login', require('./login'));

module.exports = Router;