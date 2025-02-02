import { Router } from 'express';
import deviceService from '../services/deviceService.js';
import { loggedOnly } from '../middlewares/routeGuard.js';

const deviceController = Router();
// ! CREATE requests
deviceController.get('/create', loggedOnly, (req, res) => {
  res.render('device/create');
});
deviceController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const ownerId = res.locals.user._id;
  try {
    const device = await deviceService.createDevice(userInput, ownerId);
    res.redirect('/');
  } catch (error) {
    res.render('device/create', { userInput, error });
  }
});
// ! CATALOG requests
deviceController.get('/catalog', async (req, res) => {
  try {
    const devices = await deviceService.getAllDevices().lean();
    res.render('device/catalog', { devices });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! DETAILS requests
deviceController.get('/details/:deviceId', async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await deviceService.getDeviceById(deviceId).lean();
    const owner = device.owner.toString();
    const currentUserId = res.locals?.user?._id;
    const isPreffered = device.prefferedList.some((el) => el.toString() == currentUserId);

    const isOwner = owner == currentUserId;
    res.render('device/details', { device, isOwner, isPreffered });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! EDIT DEVICE
deviceController.get('/edit/:deviceId', loggedOnly, async (req, res) => {
  const { deviceId } = req.params;
  const currentUserId = res.locals.user._id;
  try {
    const device = await deviceService.getDeviceById(deviceId).lean();
    if (currentUserId != device.owner.toString()) {
      return res.redirect('/404');
    }
    res.render('device/edit', { device });
  } catch (error) {
    res.redirect('/404');
  }
});
deviceController.post('/edit/:deviceId', loggedOnly, async (req, res) => {
  const { deviceId } = req.params;
  const userInput = req.body;
  try {
    const device = await deviceService.getDeviceById(deviceId).lean();
    const currentUserId = res.locals?.user._id;
    if (currentUserId != device.owner.toString()) {
      return res.redirect('/404');
    }
  } catch (error) {
    return res.redirect('/404');
  }
  try {
    await deviceService.updateDeviceById(deviceId, userInput);
    res.redirect(`/devices/details/${deviceId}`);
  } catch (err) {
    res.render('device/edit', { error: err.message, device: userInput });
  }
});
// ! DELETE DEVICE
deviceController.get('/delete/:deviceId', loggedOnly, async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await deviceService.getDeviceById(deviceId).lean();
    const currentUserId = res.locals.user._id;
    const ownerId = device.owner.toString();
    if (currentUserId != ownerId) {
      return res.redirect('/404');
    }
    try {
      await deviceService.deleteDeviceById(deviceId);
      res.redirect('/devices/catalog');
    } catch (err) {
      res.render('device/details', { error: err.message, device });
    }
  } catch (error) {
    res.redirect('/404');
  }
});
// ! PREFER DEVICE
deviceController.get('/prefer/:deviceId', loggedOnly, async (req, res) => {
  const { deviceId } = req.params;
  const currentUserId = res.locals.user._id;
  try {
    const device = await deviceService.getDeviceById(deviceId).lean();
    if (device.owner.toString() == currentUserId) {
      return res.redirect('/404');
    }
  } catch (error) {
    return res.redirect('/404');
  }
  try {
    await deviceService.preferDevice(deviceId, currentUserId);
    res.redirect(`/devices/details/${deviceId}`);
  } catch (error) {
    res.redirect('/404');
  }
});
// ! DEVICES PROFILE
deviceController.get('/profile', loggedOnly, async (req, res) => {
  const userId = res.locals?.user._id;
  try {
    const [devices, preferedDevices] = await Promise.all([
      deviceService.getAllByUserId(userId).lean(),
      deviceService.getPreferedDevicesByUserId(userId).lean(),
    ]);
    res.render('device/profile', { devices, preferedDevices });
  } catch (error) {
    res.redirect('/404');
  }
});
export default deviceController;
