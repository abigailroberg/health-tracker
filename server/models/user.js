const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true
    },
    password: {
        type: String,
        // bcrypt
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [/.+\@.+\..+/, 'invalid email dawg']
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    activities: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Activity'
        }
    ],   
    foods: [
       {
         type: Schema.Types.ObjectId,
         ref: 'Food'
       }
    ]
  },
  {
    toJSON: {
      virtuals: false,
      getters: true
    },
    id: false
  });

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;