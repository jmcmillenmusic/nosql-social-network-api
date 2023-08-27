// Import Schema and model from mongoose and Reaction.js
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Establishes Schema for creating the Thought model
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: () => {
                Date.now.toLocaleDateString();
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions associated with a thought
thoughtSchema
    .virtual('reactionCount')
    .get(() => {
        return `Your thought has ${this.reactions.length} reaction(s)!`;
    });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
