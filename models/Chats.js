const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users: {
        required: true,
        ref: 'users'
        //populate
    },
    messages: [
        {
            username: {
                type: String,
                required: true
            },
            date: {
                type: Number,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = ChatSchema;
module.exports = mongoose.model(ChatSchema);