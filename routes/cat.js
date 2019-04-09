const express = require('express');
const router  = express.Router();
const Cat = require('../models/Cat');

const ensureLogin = require('connect-ensure-login');

router.get('/create', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {

  Cat.create({
    name: req.query.name,
    food: req.query.food,
    owner: req.user.id
  })
  .then(cat => {
    res.send(cat);
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/mine', 
ensureLogin.ensureLoggedIn('/auth/login'), 
(req, res, next) => {
  Cat.find({
    owner: req.user.id
  })
    .then(cats => {
      res.send(cats)
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/all', 
ensureLogin.ensureLoggedIn('/auth/login'), 
(req, res, next) => {
  if(req.user.role === "ADMIN") {
    next();
  } else {
    res.send("insufficient power")
  }
},
(req, res, next) => {

  Cat.find()
    .then(cats => {
      res.send(cats)
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
