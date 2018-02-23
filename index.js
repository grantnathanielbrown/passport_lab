const express = require('express'); 
const hbs = require('hbs');
const parser = require('body-parser');
const method = require('method-override');

const passport = require('passport')

const app = express();

// figure out what to link this to
require('./config/passport') (passport)
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs');
app.use(parser.urlencoded({ extended: true }));
app.use(method('_method'));
app.use(express.static('public'));

const Restaurant = require('./models/Restaurants.js');

const restaurantsController = require('./controllers/restaurants.js');

app.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .then(restaurants => {
      res.render('index', { restaurants });
    });
});

app.use('/restaurants', restaurantsController);

app.listen(3000, () => console.log('server is running'));
