import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [4, 'Username should be at least 4 characters!'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, 'Email should be at least 10 characters!'],
    },
    password: {
      type: String,
      required: true,
      minLength: [3, 'Password should be at least 3 characters!'],
    },
  },
  { collation: { locale: 'en', strength: 2 } }
);
userSchema.pre('save', async function () {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 11);
    this.password = hashedPassword;
  } catch (error) {
    throw error;
  }
});

export default model('user', userSchema);
