const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    reactions: [
        
    ]
});

const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;