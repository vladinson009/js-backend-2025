import User from '../models/User.js';
import createToken from '../utils/createToken.js';
import bcrypt from 'bcrypt';
async function register(userInput) {
  if (userInput.password !== userInput.rePass) {
    throw new Error('Passwords does not match!');
  }
  try {
    const isUser = User.findOne({ email: userInput.email });
    if (isUser != null) {
      throw new Error(`Email ${isUser.email} already exist in our database!`);
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
async function login(userInput) {
  try {
    const isUser = User.findOne({ email: userInput.email });
    if (isUser == null) {
      throw new Error(`Invalid email or password!`);
    }
    const isPasswordMatch = await bcrypt.compare(
      userInput.password,
      isUser.password
    );
    if (!isPasswordMatch) {
      throw new Error(`Invalid email or password!`);
    }
    return createToken(isUser);
  } catch (error) {
    throw error;
  }
}

export default {
  login,
  register,
};
