// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     items: [
//         {
//             productId: String,
//             quantity: Number,
//             price: Number
//         }
//     ],
//     totalAmount: Number,
//     orderDate: { type: Date, default: Date.now }
// });

// const Order = mongoose.model('Order', orderSchema, 'orders');
// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number,
            status: { type: String, default: 'inStock' },

        }
    ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;
