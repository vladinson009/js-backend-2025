import mongoose from 'mongoose';
import { CONNECTION_STRING } from '../constants.js';

export default function () {
  return mongoose.connect(CONNECTION_STRING);
}
