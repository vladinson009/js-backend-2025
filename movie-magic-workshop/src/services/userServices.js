import User from '../models/User.js';

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

export default { register };
