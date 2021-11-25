const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const activitySchema = new Schema({
      type: {
        type: String,
        required: true,
        maxlength: 100
      },
      caloricValue: {
        type: Number,
        required: true, 
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      details: {
        type: String,
        required: false,
        maxlength: 280
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    });

const Activity = model('Activity', activitySchema)

module.exports = Activity