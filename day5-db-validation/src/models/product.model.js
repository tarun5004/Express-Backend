let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: "no description"
    },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "clothing", "food"],
        default: "electronics"
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: ["USD", "INR", "EUR"],
            default: "INR"
        }
    },
    stock: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("product", productSchema);
