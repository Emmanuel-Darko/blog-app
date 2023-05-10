const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true},
    image: {type: String, required: false}
})

module.exports = mongoose.model('PostModel', postSchema)