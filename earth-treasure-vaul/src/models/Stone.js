import { Schema, model } from 'mongoose';

const stoneSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  formula: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  likedList: [
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
export default model('Stone', stoneSchema);
