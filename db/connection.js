const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yum');

mongoose.Promise = Promise;

module.exports = mongoose;
