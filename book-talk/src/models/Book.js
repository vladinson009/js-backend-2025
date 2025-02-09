import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
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
