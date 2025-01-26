import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET_WORD } from '../constants.js';

function createToken(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET_WORD, { expiresIn: '2d' });
}
