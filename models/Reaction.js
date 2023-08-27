// Import Schema and Types from mongoose
const { Schema, Types } = require('mongoose');

// Establishes Schema for creating the Reaction model
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: () => {
                Date.now.toLocaleDateString();
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;