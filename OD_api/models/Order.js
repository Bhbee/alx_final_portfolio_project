const mongoose = require('mongoose')
const Customer = require('./Customer')
const OrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    description: {
        type: String,
        required: true,
    },
    delivery_address: {
        type: String,
        required: true,
    },
    initial_delivery_date:{
        type: String,
        required: true,
    },
    final_delivery_date:{
        type: String
    },
    status:{
        type: String,
        required: true,
        enum: ['Not Delivered', 'Delivery in progress', 'Delivered'],
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Customer
    }
})

module.exports = mongoose.model('Order', OrderSchema)