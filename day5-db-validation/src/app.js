const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productModel = require('./models/product.model');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

// Create product API
app.post('/products', async (req, res) => {
    try {
        const { productName, description, category, amount, currency, stock } = req.body;

        if (!productName || !category || amount === '' || !currency || stock === '') {
            return res.status(400).json({
                message: 'Product name, category, amount, currency and stock are required'
            });
        }

        const product = await productModel.create({
            productName,
            description,
            category,
            price: {
                amount,
                currency
            },
            stock
        });

        return res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
});

// Get all products API
app.get('/products', async (req, res) => {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: 'Products fetched successfully',
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// Get single product API
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product fetched successfully',
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// Update product API
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, description, category, amount, currency, stock } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }

        if (!productName || !category || amount === '' || !currency || stock === '') {
            return res.status(400).json({
                message: 'Product name, category, amount, currency and stock are required'
            });
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            {
                productName,
                description,
                category,
                price: {
                    amount,
                    currency
                },
                stock
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
});

// Delete product API
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
});

module.exports = app;
