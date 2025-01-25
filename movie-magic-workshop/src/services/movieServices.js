import Movie from '../models/Movie.js';
function createMovie(formData) {
  for (const field in formData) {
    if (formData[field] == '') {
      throw new Error('All fields are required!');
    }
  }
  return Movie.create(formData);
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

export default {
  getAll,
  createMovie,
  getByCriteria,
  getById,
};
