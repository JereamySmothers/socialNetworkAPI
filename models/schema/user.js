const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user' 
    }],
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }]
});

const user = model('user', userSchema);

module.exports = user;