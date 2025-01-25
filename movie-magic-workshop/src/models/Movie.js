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
    max: currentYear,
    min: 1950,
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
    max: 10,
    min: 1,
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
      casts: { type: Types.ObjectId, ref: 'cast' },
    },
  ],
});

export default model('movie', movieSchema);
