import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    username: {
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
userSchema.pre('save', async function () {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 11);
    this.password = hashedPassword;
  } catch (error) {
    throw error;
  }
});

export default model('user', userSchema);
