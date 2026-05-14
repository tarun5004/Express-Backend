const express = require('express');
const mongoose = require('mongoose');
const productModel = require('./models/product.model');

const app = express();

app.use(express.json());

const hasValue = (value) => value !== undefined && value !== null && value !== '';

const getAllowedValues = (path) => productModel.schema.path(path).enumValues;

const buildProductData = (body, isUpdate = false) => {
    const errors = [];
    const data = {};
    const price = {};
    const allowedCategories = getAllowedValues('category');
    const allowedCurrencies = getAllowedValues('price.currency');

    if (!isUpdate || hasValue(body.productName)) {
        if (!hasValue(body.productName)) {
            errors.push('Product name is required');
        } else {
            data.productName = body.productName.trim();
        }
    }

    if (hasValue(body.description)) {
        data.description = body.description.trim();
    }

    if (!isUpdate || hasValue(body.category)) {
        if (!hasValue(body.category)) {
            errors.push('Category is required');
        } else if (!allowedCategories.includes(body.category)) {
            errors.push(`Category must be one of: ${allowedCategories.join(', ')}`);
        } else {
            data.category = body.category;
        }
    }

    const amount = body.amount ?? body.price?.amount;
    const currency = body.currency ?? body.price?.currency;

    if (!isUpdate || hasValue(amount)) {
        const amountNumber = Number(amount);

        if (!hasValue(amount)) {
            errors.push('Price amount is required');
        } else if (!Number.isFinite(amountNumber) || amountNumber < 0) {
            errors.push('Price amount must be a valid positive number');
        } else {
            price.amount = amountNumber;
        }
    }

    if (!isUpdate || hasValue(currency)) {
        if (!hasValue(currency)) {
            errors.push('Currency is required');
        } else if (!allowedCurrencies.includes(currency)) {
            errors.push(`Currency must be one of: ${allowedCurrencies.join(', ')}`);
        } else {
            price.currency = currency;
        }
    }

    if (Object.keys(price).length) {
        data.price = price;
    }

    if (!isUpdate || hasValue(body.stock)) {
        const stockNumber = Number(body.stock);

        if (!hasValue(body.stock)) {
            errors.push('Stock is required');
        } else if (!Number.isInteger(stockNumber) || stockNumber < 0) {
            errors.push('Stock must be a valid positive whole number');
        } else {
            data.stock = stockNumber;
        }
    }

    return { data, errors };
};

const buildUpdateData = (data) => {
    const updateData = { ...data };

    if (data.price) {
        delete updateData.price;

        if (data.price.amount !== undefined) {
            updateData['price.amount'] = data.price.amount;
        }

        if (data.price.currency !== undefined) {
            updateData['price.currency'] = data.price.currency;
        }
    }

    return updateData;
};

const handleProductError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            message: 'Product already exists',
            error: 'Product name must be unique'
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(error.errors).map((item) => item.message)
        });
    }

    return res.status(500).json({
        message: 'Something went wrong',
        error: error.message
    });
};

// Create product API
app.post('/products', async (req, res) => {
    try {
        const { data, errors } = buildProductData(req.body);

        if (errors.length) {
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        const product = await productModel.create(data);

        return res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        return handleProductError(res, error);
    }
});

// Get all products API
app.get('/products', async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Products retrieved successfully',
            products
        });
    } catch (error) {
        return handleProductError(res, error);
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
            message: 'Product retrieved successfully',
            product
        });
    } catch (error) {
        return handleProductError(res, error);
    }
});

// Update product API
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product id'
            });
        }

        const { data, errors } = buildProductData(req.body, true);

        if (errors.length) {
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        if (!Object.keys(data).length) {
            return res.status(400).json({
                message: 'Please provide at least one field to update'
            });
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            buildUpdateData(data),
            { new: true, runValidators: true }
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
        return handleProductError(res, error);
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
        return handleProductError(res, error);
    }
});

module.exports = app;
