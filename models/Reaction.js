const { Schema, Types } = require('mongoose');
const {dateConverter} = require('../utils/helper')

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
        type: String,
        required: true,
      },
    createdAt:  {
        type: Date,
        default: Date.now,
        get: dateConverter,
    },
  },
  {
    toJSON: {
      getters:true,
    },
  }
);




module.exports = reactionSchema;