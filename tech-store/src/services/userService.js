import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import createToken from '../utils/createToken.js';
async function register(userInput) {
  for (const field in userInput) {
    if (!userInput[field]) {
      throw new Error(`${field} is requried!`);
    }
  }
  if (userInput.password !== userInput['confirm-password']) {
    throw new Error('Passwords does not match!');
  }
  try {
    const isUser = await User.findOne({ email: userInput.email });
    if (isUser) {
      throw new Error('Email already exists!');
    }
    const newUser = await User.create(userInput);
    return createToken(newUser);
  } catch (error) {
    throw error.message;
  }
}

async function login(userInput) {
  for (const field in userInput) {
    if (!userInput[field]) {
      throw new Error(`${field} is requried!`);
    }
  }
  try {
    const isUser = await User.findOne({ email: userInput.email });
    if (!isUser) {
      throw new Error('Invalid email or password!');
    }
    const isValidPassword = await bcrypt.compare(userInput.password, isUser.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password!');
    }
    return createToken(isUser);
  } catch (error) {
    throw error.message;
  }
}

export default { register, login };
