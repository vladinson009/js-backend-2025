import { Schema, model } from 'mongoose';

const deviceSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  hardDisk: {
    type: String,
    required: true,
  },
  screenSize: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  operatingSystem: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
  gpu: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  prefferedList: [
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

export default model('device', deviceSchema);
