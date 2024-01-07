const { Schema, model } = require('mongoose');
const {dateConverter} = require('../utils/helper')


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
      required: true,
      unique: true
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
