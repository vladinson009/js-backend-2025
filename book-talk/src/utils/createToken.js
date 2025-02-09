import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
export default function (userData) {
  const payload = {
    _id: userData._id,
    email: userData.email,
    username: userData.username,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  return token;
}
