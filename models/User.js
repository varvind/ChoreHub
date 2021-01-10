const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    completed: {
        type: [String],
        default: []
    },
    pending: {
        type: [String],
        default: []
    },
    requests: {
        type: [String],
        default: []
    },
    image: {
        filename: {
          required: true,
          type: String
        },
        id: {
          required: true,
          type: String
        }
    },
    familyid: {
        type: String,
        default: "undefined"
    }

})

const User = mongoose.model('User', UserSchema)
module.exports = User