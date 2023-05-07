const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    uuid:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, default: ''}
})

module.exports = mongoose.model('UserModel', userSchema)