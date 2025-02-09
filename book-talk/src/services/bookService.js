import Book from '../models/Book.js';

function create(userInput, userId) {
  for (const field in userInput) {
    if (userInput[field] == '') {
      throw new Error(`${field} is required!`);
    }
  }
  return Book.create({ ...userInput, userId });
}

export default { create };
