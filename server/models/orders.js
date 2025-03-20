const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            prize: String,
            salePrize: String,
            quantity: Number
        }
    ],
    addressInfo:
    {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String
})

const Order = mongoose.model('Order', OrdersSchema);

module.exports = Order;