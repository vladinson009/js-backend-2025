import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [2, 'Title should be atleast 2 characters long'],
  },
  ingredients: {
    type: String,
    required: true,
    minLength: [10, 'Ingredients should be between 10 characters long'],
    maxLength: [200, 'Ingredients should be between 200 characters long'],
  },
  instructions: {
    type: String,
    required: true,
    minLength: [10, 'Instructions should be between 10 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description should be between 10 characters long'],
    maxLength: [100, 'Description should be between 100 characters long'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        const pattern = /^https?:\/\//;
        return pattern.test(value);
      },
      message: 'Not a valid URL',
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
    ref: 'user',
    required: true,
  },
});

export default model('recipe', recipeSchema);
