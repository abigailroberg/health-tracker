const { Schema } = require('mongoose');
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

/*
const filter = function() {
    emit(this.caloricValue);
};

const reduce = function(caloricValue) {
  const total = Array.sum(caloricValue);
  return total
};

db.foodSchema.mapReduce(
  filter,
  reduce,
  { out: "foodValue" }
);

foodSchema.virtual('FoodValue').get(function() {
  db.foodValue.find()
});

module.exports = foodSchema, db.foodValue
*/

foodSchema.virtual('FoodValue').get(function() {
  return this.caloricValue
  });

module.exports = foodSchema