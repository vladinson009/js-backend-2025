import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET_WORD } from '../constants.js';

export default function createToken(userData) {
  const payload = {
    email: userData.email,
    _id: userData._id.toString(),
  };
  return jsonwebtoken.sign(payload, JWT_SECRET_WORD, { expiresIn: '2d' });
}
