/*jshint esversion:6*/

const express = require('express');
const users = express.Router();
const {User, Card} = require('../../models');

//const db = require('../../models');
//const User = db.User;

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

users.get('/:id', (req,res) => {
  if(!isNaN(parseInt(req.params.id))){
    User.findOne({
      where: {id: req.params.id}
    })
    //User.findById
      .then((user) => {
        res.json(user);
      });
  } else {
    User.findOne({
      where: {username: req.params.id},
    })
    //User.findById
      .then((user) => {
        res.json(user);
      });
  }
});


users.get('/', (req,res) => {
  User.all()
    .then((users) => {
      res.json(users);
    });
});


users.post('/', (req,res) =>{
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create( {
        "username" : req.body.username,
        "password": hash,
      })
        .then(res.json.bind(res))
        .catch(res.json.bind(res));
    });
  });
});

module.exports = users;