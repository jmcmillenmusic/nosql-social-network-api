// Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Regular expression for matching and validating an email address for the user
const regexEmail = '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/'

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
            validate: function (validator) {
                return regexEmail.test(validator);
            }
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
    .get(() => {
        return `You have a total of ${this.friends.length} friend(s)!`;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;