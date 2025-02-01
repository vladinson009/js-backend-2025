import Movie from '../models/Movie.js';
function createMovie(formData, creatorId) {
  for (const field in formData) {
    if (formData[field] == '') {
      throw new Error('All fields are required!');
    }
  }
  return Movie.create({ ...formData, creatorId });
}
function editMovie(formData, movieId) {
  for (const field in formData) {
    if (formData[field] == '') {
      throw new Error('All fields are required!');
    }
  }
  return Movie.findByIdAndUpdate(movieId, formData, {
    runValidators: true,
    new: true,
  });
}
function deleteMovie(movieId) {
  return Movie.findByIdAndDelete(movieId);
}
function getAll() {
  return Movie.find();
}
function getByCriteria(criteria) {
  let query = Movie.find();
  if (criteria.title) {
    query = query.find({ title: { $regex: new RegExp(criteria.title, 'i') } });
  }
  if (criteria.genre) {
    query = query.find({ genre: { $regex: new RegExp(criteria.genre, 'i') } });
  }
  if (criteria.year) {
    query = query.find({
      year: {
        $gte: Number(criteria.year) - 1,
        $lte: Number(criteria.year) + 1,
      },
    });
  }
  return query;
}
function getById(id) {
  return Movie.findById(id);
}
function attachCast(movieId, formData) {
  if (formData.cast == '' || formData.nameInMovie == '') {
    throw new Error('All fields are required');
  }
  return Movie.findByIdAndUpdate(
    movieId,
    {
      $push: {
        casts: {
          nameInMovie: formData.nameInMovie,
          cast: formData.cast,
        },
      },
    },
    { new: true, runValidators: true }
  );
}

export default {
  getAll,
  createMovie,
  editMovie,
  getByCriteria,
  getById,
  attachCast,
  deleteMovie,
};
