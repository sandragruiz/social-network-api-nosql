const { Schema, model } = require('mongoose');

// Schema for user model

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        thoughts: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

// Schema settings

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// Initialize user model

const User = model('User', userSchema);

module.exports = User;