import User from '../models/User.js';
import bcrypt from 'bcrypt';
// * REGISTER new user
async function register(inputData) {
  for (const key in inputData) {
    if (!inputData[key]) {
      throw new Error('All fields are required!');
    }
  }
  if (inputData.password !== inputData.rePass) {
    throw new Error('Passwords does not match!');
  }
  try {
    const isUser = await User.findOne({ email: inputData.email });
    if (isUser) {
      throw new Error('User already exist!');
    }
    return User.create({
      email: inputData.email,
      password: inputData.password,
    });
  } catch (error) {
    throw error;
  }
}
// * LOGIN user
async function login(inputData) {
  for (const key in inputData) {
    if (!inputData[key]) {
      throw new Error('All fields are required!');
    }
  }
  try {
    const isUser = await User.findOne({ email: inputData.email });
    if (!isUser) {
      throw new Error('Email or password does not match!');
    }
    const hashedPassword = await bcrypt.compare(inputData.password, isUser.password);
    if (!hashedPassword) {
      throw new Error('Email or password does not match!');
    }
    return isUser;
  } catch (error) {
    throw error;
  }
}

export default { register, login };
