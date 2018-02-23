const Restaurant = require('../models/Restaurants');
const data = require('./seeds.json');

Restaurant.remove({})
  .then(() => {
    return Restaurant.collection.insert(data);
  })
  .then(() => {
    process.exit();
  });
