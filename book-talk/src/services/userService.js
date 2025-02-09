import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
import bcrypt from 'bcrypt';
import createToken from '../utils/createToken.js';
// login
async function login(userInput) {
  for (const field in userInput) {
    if (userInput[field] == '') {
      throw new Error(`${field} is required!`);
    }
  }
  try {
    const isUser = await User.findOne({ email: userInput.email });
    if (!isUser) {
      throw new Error('Email or password does not match!');
    }
    const isPasswordMatch = await bcrypt.compare(
      userInput.password,
      isUser.password
    );
    if (!isPasswordMatch) {
      throw new Error('Email or password does not match!');
    }
    return createToken(isUser);
  } catch (error) {
    throw error;
  }
}
//register user
async function register(userInput) {
  for (const field in userInput) {
    if (userInput[field] == '') {
      throw new Error(`${field} is required!`);
    }
  }
  if (userInput.password !== userInput.rePass) {
    throw new Error('Passwords does not match!');
  }
  try {
    const isUser = await User.findOne({ email: userInput.email }).select('_id');
    if (isUser) {
      throw new Error('User already exist!');
    }
  } catch (error) {
    throw error;
  }
  try {
    const newUser = await User.create(userInput);
    return createToken(newUser);
  } catch (error) {
    throw error;
  }
}

export default { register, login };
