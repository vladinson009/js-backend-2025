import Cast from '../models/Cast.js';
import mongoose from 'mongoose';
function create(data) {
  return Cast.create(data);
}
function addMovie(castId, movieId) {
  return Cast.findByIdAndUpdate(
    castId,
    {
      $push: {
        movies: movieId,
      },
    },
    { runValidators: true, new: true }
  );
}
function fetchCast(ninMovieId) {
  return Cast.find({
    movies: {
      $nin: [ninMovieId],
    },
  });
}

export default { create, fetchCast, addMovie };
