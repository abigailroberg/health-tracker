const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const foodSchema = new Schema({
      type: {
        type: String,
        required: true,
        maxlength: 100
      },
      caloricValue: {
        type: Number,
        required: true,
      },
      details: {
        type: String,
        required: false,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    }
  );

const Food = model('Food', foodSchema)

module.exports = Food