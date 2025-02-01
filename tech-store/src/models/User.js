import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
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

userSchema.pre('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, 11);
  this.password = hashedPassword;
});

export default model('user', userSchema);
