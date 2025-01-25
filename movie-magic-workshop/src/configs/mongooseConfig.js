import mongoose from 'mongoose';

export default async function () {
  try {
    await mongoose.connect('mongodb://localhost:27017/nameSomeDB');
    console.log('connected to DB...');
  } catch (error) {
    console.log('Can not connect to DB...');
  }
}
