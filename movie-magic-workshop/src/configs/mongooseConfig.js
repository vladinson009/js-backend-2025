import mongoose from 'mongoose';
import { DB_URL } from '../constants.js';
// * mongoose connection
export default async function () {
  try {
    await mongoose.connect(DB_URL);
    console.log('connected to DB...');
  } catch (error) {
    console.log('Can not connect to DB...');
  }
}
