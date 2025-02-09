import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants.js';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, 'Name should be between 2 and 20 characters long'],
      maxLength: [20, 'Name should be between 2 and 20 characters long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, 'Email should be at least 10 characters long'],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, 'Password should be at least 4 characters long'],
    },
  },
  { collation: { locale: 'en', strength: 2 } }
);

userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default model('user', userSchema);
