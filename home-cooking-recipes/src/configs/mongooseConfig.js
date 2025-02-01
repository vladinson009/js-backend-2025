import mongoose from 'mongoose';

export default async function mongooseConfig() {
  return mongoose.connect('mongodb://localhost:27017/home-cooking-recipes-jan-25');
}
