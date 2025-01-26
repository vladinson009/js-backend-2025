import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // ! COLLATION IN SCHEMA LEVEL
  { collation: { locale: 'en', strength: 2 } }
);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
  }
  next();
});

export default model('user', userSchema);
