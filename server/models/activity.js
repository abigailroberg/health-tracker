const { Schema } = require('mongoose');
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

/*
const filter = function() {
    emit(this.caloricValue);
};

const reduce = function(caloricValue) {
  const total = Array.sum(caloricValue);
  return total
};

db.activitySchema.mapReduce(
  filter,
  reduce,
  { out: "activityValue" }
);

activitySchema.virtual('activityValue').get(function() {
  db.activityValue.find()
});

module.exports = activitySchema, db.activityValue
*/

activitySchema.virtual('activityValue').get(function() {
  return this.caloricValue
  });

module.exports = activitySchema