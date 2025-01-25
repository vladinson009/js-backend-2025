import { Schema, Types, model } from 'mongoose';

const castSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    max: 100,
    min: 18,
  },
  born: {
    type: String,
    required: true,
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
  movies: [
    {
      type: Types.ObjectId,
      ref: 'movie',
    },
  ],
});

export default model('cast', castSchema);
