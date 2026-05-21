const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const createProduct = asyncHandler(async (req, res) => {
    const productData = {
        ...req.body,
        slug: createSlug(req.body.title),
        createdBy: req.user._id,
    }
    const product = await Product.create(productData);

    return res.status(201).json(
        new ApiResponse(201, {
            product,
        }, "Product created successfully")
    );
});

//     body data lo
// title se slug banao
// createdBy logged-in user se set karo
// DB me create karo


const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully", products));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "createdBy",
    "username email"
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully", product));
});

const updateProduct = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  if (updateData.title) {
    updateData.slug = createSlug(updateData.title);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", product));
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully", product));
});








module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};