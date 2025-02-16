import { Schema, model } from 'mongoose';

const disasterSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name should be at least 2 characters long'],
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: [
        'Wildfire',
        'Flood',
        'Earthquake',
        'Hurricane',
        'Drought',
        'Tsunami',
        'Other',
      ],
      message:
        'The Type should be select between "Wildfire", "Flood", "Earthquake", "Hurricane", "Drought", "Tsunami", "Other"',
    },
  },
  year: {
    type: Number,
    required: true,
    min: [0, 'Year should be between 0 and 2024'],
    max: [2024, 'Year should be between 0 and 2024'],
  },
  location: {
    type: String,
    required: true,
    minLength: [3, 'Location should be at least 3 characters long'],
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
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description should be at least 10 characters long'],
  },
  interestedList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    requred: true,
  },
});

export default model('disaster', disasterSchema);
