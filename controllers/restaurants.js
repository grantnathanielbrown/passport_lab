const express = require('express');
const router = express.Router();
const passport = require('passport')

const Restaurant = require('../models/Restaurants.js');

router.get('/', (req, res) => {
  Restaurant.find({}).then(restaurants => {
    res.render('restaurants/index', { restaurants });
  });
});

router.get('/new', (req, res) => {
  res.render('restaurants/new');
});

router.get('/signup', (req, res) => {
  res.render('signup');
  //, { message: req.flash('signupMessage') }
});

router.get('/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id }).then(restaurant => {
    res.render('restaurants/show', restaurant);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  Restaurant.create(req.body.restaurant).then(() => {
    res.redirect('/');
  });
});

router.post('/signup', (req, res)=> {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(req, res);
});

router.get('/edit/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id }).then(restaurant => {
    res.render('restaurants/edit', restaurant);
  });
});

router.put('/:id', (req, res) => {
  Restaurant.findOneAndUpdate(
    { _id: req.params.id },
    req.body.restaurant
  ).then(restaurant => {
    res.redirect(`/restaurants/${restaurant.id}`);
  });
});

router.delete('/:id', (req, res) => {
  Restaurant.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.redirect('/restaurants');
  });
});

module.exports = router;
