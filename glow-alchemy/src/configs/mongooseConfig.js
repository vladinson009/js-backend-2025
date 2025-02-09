import mongoose from 'mongoose';
import { CONNECTION_URL } from '../constants.js';

export default function () {
  return mongoose.connect(CONNECTION_URL);
}
