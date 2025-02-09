import { Schema, model } from 'mongoose';

const cosmeticSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  skin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
