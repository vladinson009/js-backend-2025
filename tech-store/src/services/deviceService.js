import Device from '../models/Device.js';
// ! CREATE NEW DEVICE
function createDevice(userInput, owner) {
  for (const field in userInput) {
    if (userInput[field].trim() == '') {
      throw new Error(`${field} is required!`);
    }
  }
  if (Number.isNaN(Number(userInput.price))) {
    throw new Error('Price must be a number!');
  }
  return Device.create({ ...userInput, owner });
}
// ! GET ALL DEVICES
function getAllDevices() {
  return Device.find({});
}
// ! GET LAST THREE DEVICES
function getLastThreeDevices() {
  return Device.find({}).sort({ _id: -1 }).limit(3);
}
// ! GET DEVICE BY ID
function getDeviceById(deviceId) {
  return Device.findById(deviceId);
}

export default {
  createDevice,
  getLastThreeDevices,
  getDeviceById,
  getAllDevices,
};
