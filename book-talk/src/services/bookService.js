import Book from '../models/Book.js';

function create(userInput, owner) {
  for (const field in userInput) {
    if (userInput[field] == '') {
      throw new Error(`${field} is required!`);
    }
  }
  return Book.create({ ...userInput, owner });
}
function getAll() {
  return Book.find();
}
function getById(bookId) {
  return Book.findById(bookId);
}

export default { create, getAll, getById };
