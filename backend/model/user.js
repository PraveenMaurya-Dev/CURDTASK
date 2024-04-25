const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true
    },
    DOB: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true
    }
})

const user = mongoose.model('user', userSchema)

module.exports = user;