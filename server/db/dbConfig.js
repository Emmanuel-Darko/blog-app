const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb://127.0.0.1/blogdb')
    .then(res => console.log("database connected"))
} catch (error) {
    console.log(err)
}