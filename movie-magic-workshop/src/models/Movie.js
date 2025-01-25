import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  direcotr: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model('movie', movieSchema);
