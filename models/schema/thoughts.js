const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema({

    thoughtText: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timeSince(timestamp),
    },

    createdBy: {
        type: String,
        required: true,
    },
    
    reactions: [reactionSchema],   
});

const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;