const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    phone_number: {
        type: String,
        unique: true,
        required: true,
    }
})

module.exports = mongoose.model('Customer', CustomerSchema )