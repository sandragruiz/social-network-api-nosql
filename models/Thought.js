const { Schema, model } = require('mongoose');

// Schema for reactions

const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString()
    }
  });

// Schema for thoughts model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString()
          },
          username: {
            type: String,
            required: true
          },
          reactions: [reactionSchema]
    }
);

// Schema settings

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  
// Initialize thought model

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;