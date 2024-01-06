const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      },],
    createdAt:  {
        type: Date,
        default: Date.now(),
        //get: dateConverter,
    },
  },
);


const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;