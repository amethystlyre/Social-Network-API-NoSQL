const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    createdAt:  {
        type: Date,
        default: Date.now(),
        //get: dateConverter,
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
    },
  }
);

userSchema.pre('save', function() {
    return this.username.trim();
  });

const User = model('user', userSchema);

module.exports = User;
