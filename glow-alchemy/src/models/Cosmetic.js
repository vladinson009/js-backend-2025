import { Schema, model } from 'mongoose';

const cosmeticSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name should be at least 2 characters long!'],
  },
  skin: {
    type: String,
    required: true,
    minLength: [10, 'Skin should be between 10 and 100 characters long'],
    maxLength: [100, 'Skin should be between 10 and 100 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [20, 'Description should be between 20 and 200 characters long'],
    maxLength: [200, 'Description should be between 20 and 200 characters long'],
  },
  ingredients: {
    type: String,
    required: true,
    minLength: [2, 'Ingredients should be between 2 and 50 characters long'],
    maxLength: [50, 'Ingredients should be between 2 and 50 characters long'],
  },
  benefits: {
    type: String,
    required: true,
    minLength: [10, 'Benefits should be between 10 and 100 characters long'],
    maxLength: [100, 'Benefits should be between 10 and 100 characters long'],
  },
  price: {
    type: Number,
    required: true,
    min: [1, 'Price should be a positive number'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const pattern = /^https?:\/\//;
        return pattern.test(value);
      },
      message: `Image url should be a valid URL`,
    },
  },
  recommendList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model('cosmetic', cosmeticSchema);
