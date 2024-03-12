const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  title: String,
  poster: String,
  imdb: Number,
  description: String,
});

const movieModel = mongoose.model("movies", MovieSchema);

module.exports = { movieModel };
