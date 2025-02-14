import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../constans.js';

export default function () {
  return mongoose.connect(DB_CONNECTION_STRING);
}
