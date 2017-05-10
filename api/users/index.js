/*jshint esversion:6*/

const express = require('express');
const users = express.Router();
const {User, Card} = require('../../models');

//const db = require('../../models');
//const User = db.User;

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
      where: {name: req.params.id},
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
  User.create( {"name" : req.body.name})
    .then(res.json.bind(res))
    .catch( res.json.bind(res));
});

module.exports = users;