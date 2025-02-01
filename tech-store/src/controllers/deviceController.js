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

    const isOwner = owner == currentUserId;
    res.render('device/details', { device, isOwner });
  } catch (error) {
    res.redirect('/404');
  }
});
export default deviceController;
