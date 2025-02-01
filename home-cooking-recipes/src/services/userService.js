import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
async function login(data) {
  try {
    for (const field in data) {
      if (data[field].trim() == '') {
        throw new Error(`${field} field is required!`);
      }
    }
  } catch (error) {
    throw error;
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (user == null) {
      throw new Error('Email or password does not match');
    }
    const isMatchinPassword = await bcrypt.compare(data.password, user.password);
    if (!isMatchinPassword) {
      throw new Error('Email or password does not match');
    }
    const payload = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };
    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  } catch (error) {
    throw error;
  }
}
async function register(data) {
  try {
    for (const field in data) {
      if (data[field].trim() == '') {
        throw new Error(`${field} field is required!`);
      }
    }
    if (data.password != data['re-password']) {
      throw new Error('Password does not match!');
    }
    const user = await User.create(data);
    const payload = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };
    return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  } catch (err) {
    throw err;
  }
}
export default { login, register };
