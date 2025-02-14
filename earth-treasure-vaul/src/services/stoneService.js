import Stone from '../models/Stone.js';

function create(userInput, owner) {
  return Stone.create({ ...userInput, owner });
}
function getAll() {
  return Stone.find();
}
function getLastThree() {
  return Stone.find().sort({ _id: -1 }).limit(3);
}
function getById(stoneId) {
  return Stone.findById(stoneId);
}

export default { create, getAll, getLastThree, getById };
