const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};


module.exports = UserSchema;
module.exports = mongoose.model("users", UserSchema);
