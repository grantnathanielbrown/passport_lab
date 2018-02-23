const mongoose = require('../db/connection');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  owner: String,
  type: String,
  capacity: Number,
  createdAt: { type: Date, default: Date.now }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
