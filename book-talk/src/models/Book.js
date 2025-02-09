import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [2, 'Title should be at least 2 characters'],
  },
  author: {
    type: String,
    required: true,
    minLength: [5, 'Author should be at least 5 characters'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        const pattern = /^https?:\/\//;
        return pattern.test(value);
      },
      message: 'Not a valid image URL!',
    },
  },
  review: {
    type: String,
    required: true,
    minLength: [10, 'Review should be at least 10 characters'],
  },
  genre: {
    type: String,
    required: true,
    minLength: [3, 'Genre should be at least 3 characters'],
  },
  stars: {
    type: Number,
    required: true,
    min: [1, 'Stars must be between 1 and 5 included'],
    max: [5, 'Stars must be between 1 and 5 included'],
  },
  wishingList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default model('book', bookSchema);
