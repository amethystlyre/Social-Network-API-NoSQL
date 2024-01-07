const { Schema, model } = require('mongoose');
const {dateConverter,validateEmail} = require('../utils/helper')


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: 'Email address is required',
      unique: true,
      trim: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    createdAt:  {
        type: Date,
        default: Date.now,
        get: dateConverter,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      },]
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });


const User = model('user', userSchema);

module.exports = User;
