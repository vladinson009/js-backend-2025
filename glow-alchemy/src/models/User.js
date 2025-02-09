import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants.js';
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
