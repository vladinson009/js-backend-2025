import Movie from '../models/Movie.js';

function getAll() {
  return Movie.find();
}
function createMovie(formData) {
  for (const field in formData) {
    if (formData[field] == '') {
      throw new Error('All fields are required!');
    }
  }

  return Movie.create(formData);
}

export default { getAll, createMovie };
