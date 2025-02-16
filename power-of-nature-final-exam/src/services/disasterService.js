import Disaster from '../models/Disaster.js';

function create(userInput, owner) {
  return Disaster.create({ ...userInput, owner });
}
function getAll(includes = {}) {
  const filter = {};
  if (includes.name) {
    filter.name = { $regex: includes.name, $options: 'i' };
  }
  if (includes.type) {
    filter.type = { $regex: includes.type, $options: 'i' };
  }
  return Disaster.find(filter);
}
function getById(disasterId) {
  return Disaster.findById(disasterId);
}
function editById(disasterId, userInput) {
  return Disaster.findByIdAndUpdate(
    disasterId,
    { ...userInput },
    { runValidators: true }
  );
}
function deleteById(disasterId) {
  return Disaster.findByIdAndDelete(disasterId);
}

function interestedIn(disasterId, userId) {
  return Disaster.findByIdAndUpdate(
    disasterId,
    {
      $addToSet: { interestedList: userId },
    },
    { runValidators: true }
  );
}

export default { create, getAll, getById, editById, deleteById, interestedIn };
