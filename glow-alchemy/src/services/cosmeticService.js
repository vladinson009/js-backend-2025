import Cosmetic from '../models/Cosmetic.js';

function getAll(searchQuery = '') {
  const filter = {};

  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: 'i' };
  }

  return Cosmetic.find(filter);
}
function getLastThree() {
  return Cosmetic.find({}).sort({ _id: -1 }).limit(3);
}
function getById(cosmeticId) {
  return Cosmetic.findById(cosmeticId);
}
function create(userInput, owner) {
  return Cosmetic.create({ ...userInput, owner });
}
function updateById(cosmeticId, userInput) {
  return Cosmetic.findByIdAndUpdate(
    cosmeticId,
    { ...userInput },
    { runValidators: true }
  );
}
function deleteById(cosmeticId) {
  return Cosmetic.findByIdAndDelete(cosmeticId);
}
function addToReccommend(cosmeticId, userId) {
  return Cosmetic.findByIdAndUpdate(cosmeticId, {
    $addToSet: { recommendList: userId },
  });
}
export default {
  getAll,
  getLastThree,
  getById,
  create,
  updateById,
  deleteById,
  addToReccommend,
};
