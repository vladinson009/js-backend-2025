import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [2, 'username length must be between 2 and 20 characters'],
      maxLength: [20, 'username length must be between 2 and 20 characters'],
    },
    email: {
      type: String,
      required: true,
      minLength: [10, 'Email should be atleast 10 characters long'],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, 'Password should be atleast 4 characters long'],
    },
  },
  { collation: { locale: 'en', strength: 2 } }
);
userSchema.pre('save', async function () {
  try {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
  } catch (error) {
    throw error;
  }
});
export default model('user', userSchema);
