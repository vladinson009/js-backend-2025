import { Schema, model, Types } from 'mongoose';
const currentYear = new Date().getFullYear();
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
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    max: [currentYear, 'Year should be between 1950 and ' + currentYear],
    min: [1950, 'Year should be between 1950 and ' + currentYear],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(el) {
        const pattern = /^https?:\/\//;
        return pattern.test(el);
      },
      message: 'Not a valid URL',
    },
  },
  rating: {
    type: Number,
    required: true,
    max: [10, 'Rating should be between 1 and 10'],
    min: [1, 'Rating should be between 1 and 10'],
  },
  description: {
    type: String,
    required: true,
    maxLength: 150,
  },
  casts: [
    {
      _id: false,
      nameInMovie: String,
      cast: { type: Types.ObjectId, ref: 'cast' },
    },
  ],
  creatorId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model('movie', movieSchema);
