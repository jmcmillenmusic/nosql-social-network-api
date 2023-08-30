// Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Establishes Schema for creating the User model
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ]
    },
    {
        // Including virtuals in our response
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that returns the length of the friends array
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;