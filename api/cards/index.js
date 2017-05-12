/*jshint esversion:6*/

const express = require('express');
const cards = express.Router();
const {User, Card} = require('../../models');

//const db = require('../../models');
//const User = db.User;

cards.get('/', (req,res) => {
  Card.all({
    include: [
      {
        model:User,
        as:"Creator"
      },
      {
        model:User,
        as:"Assignor"
      }
    ]
  })
    .then((cards) => {
      res.json(cards);
    });
});


cards.post('/', (req,res) =>{
  console.log(req.body);
  Card.create( {
      "name" : req.body.name,
      "priority" : req.body.priority,
      "status" : req.body.status,
      "assigned_to" : req.body.assigned_to,
      "created_by" : req.body.created_by,
      })
    .then(res.json.bind(res))
    .catch( res.json.bind(res));
});

cards.put('/:id', (req,res) =>{
  Card.update({"status": req.body.status},{where: {"id": req.params.id}})
  .then(res.json.bind(res))
  .catch(error => {
    console.log(error);
  });
});

cards.delete('/:id', (req,res) =>{
  Card.destroy({where: {"id": req.params.id}})
  .then(res.json.bind(res))
  .catch(error => {
    console.log(error);
  });
});


module.exports = cards;