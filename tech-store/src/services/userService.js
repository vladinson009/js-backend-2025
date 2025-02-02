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
  if (userInput.name.length < 2 || userInput.name.length > 20) {
    throw new Error('The name should be between 2 and 20 characters long');
  }
  if (userInput.email.length < 10) {
    throw new Error('The email should be at least 10 characters long');
  }
  if (userInput.password.length < 4) {
    throw new Error('The password should be at least 4 characters long');
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
  if (userInput.email.length < 10) {
    throw new Error('The email should be at least 10 characters long');
  }
  if (userInput.password.length < 4) {
    throw new Error('The password should be at least 4 characters long');
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
