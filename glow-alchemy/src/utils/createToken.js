import { JWT_SECRET } from '../constants.js';
import { sign } from './asyncJwt.js';

export default function (userData) {
  const payload = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
  };
  return sign(payload, JWT_SECRET, { expiresIn: '2h' });
}
