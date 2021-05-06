const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  popularity_99: String,
  director: String,
  genre: Array,
  imdb_score: String,
  name: String,
  admin: String
});

module.exports =  mongoose.model('Movies', movieSchema);