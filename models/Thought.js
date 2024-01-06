const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const dateConverter = (date)=>{
    return date;

  }

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      },],
    createdAt: {
        type: Date,
        default: Date.now(),
        //get: dateConverter,
    },
    reactions:[      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },],
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });



const Thought = model('thought', thoughtSchema);

module.exports = Thought;