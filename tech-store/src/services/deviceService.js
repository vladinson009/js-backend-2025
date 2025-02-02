import Device from '../models/Device.js';
import sanitizeInput from '../utils/sanitizeInput.js';
// ! CREATE NEW DEVICE
function createDevice(userInput, owner) {
  sanitizeInput(userInput);
  return Device.create({ ...userInput, owner });
}
// ! GET ALL DEVICES
function getAllDevices() {
  return Device.find({});
}
// ! GET ALL DEVICES BY USER ID
function getAllByUserId(userId) {
  return Device.find({ owner: userId });
}
// ! GET LAST THREE DEVICES
function getLastThreeDevices() {
  return Device.find({}).sort({ _id: -1 }).limit(3);
}
// ! GET DEVICE BY ID
function getDeviceById(deviceId) {
  return Device.findById(deviceId);
}
// ! UPDATE DEVICE BY ID
function updateDeviceById(deviceId, userInput) {
  sanitizeInput(userInput);
  return Device.findByIdAndUpdate(deviceId, userInput, { runValidators: true });
}
// ! DELETE DEVICE BY ID
function deleteDeviceById(deviceId) {
  return Device.findByIdAndDelete(deviceId);
}
// ! PREFER DEVICE
function preferDevice(deviceId, userId) {
  return Device.findByIdAndUpdate(deviceId, {
    $addToSet: { prefferedList: userId },
  });
}
// ! GET PREFERED DEVICE BY USERID
function getPreferedDevicesByUserId(userId) {
  return Device.find({
    prefferedList: {
      $in: [userId],
    },
  });
}
export default {
  createDevice,
  getLastThreeDevices,
  getDeviceById,
  getAllDevices,
  preferDevice,
  deleteDeviceById,
  updateDeviceById,
  getAllByUserId,
  getPreferedDevicesByUserId,
};
