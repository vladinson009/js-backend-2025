import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../constants.js';

export default function (user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: '2h' });
  return token;
}
