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
function getWishlist(userId) {
  return Book.find({ wishingList: { $in: [userId] } });
}
function editById(bookId, userInput) {
  return Book.findByIdAndUpdate(bookId, { ...userInput }, { runValidators: true });
}
function deleteById(bookId) {
  return Book.findByIdAndDelete(bookId);
}
function addToWishlist(bookId, userId) {
  return Book.findByIdAndUpdate(bookId, {
    $addToSet: { wishingList: userId },
  });
}

export default {
  create,
  getAll,
  getById,
  editById,
  deleteById,
  addToWishlist,
  getWishlist,
};
