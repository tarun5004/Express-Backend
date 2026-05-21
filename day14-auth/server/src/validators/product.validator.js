const ApiError = require("../utils/ApiError");

const validateCreateProduct = (req, res, next) => {
  const { title, description, category, price, stock, images } = req.body;

  if (!title || !description || !category) {
    throw new ApiError(400, "Title, description and category are required");
  }

  if (price === undefined || Number(price) < 0) {
    throw new ApiError(400, "Valid price is required");
  }

  if (stock === undefined || Number(stock) < 0) {
    throw new ApiError(400, "Valid stock is required");
  }

  if (!Array.isArray(images) || images.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  next();
};

const validateUpdateProduct = (req, res, next) => {
  const { price, stock, images } = req.body;

  if (price !== undefined && Number(price) < 0) {
    throw new ApiError(400, "Price cannot be negative");
  }

  if (stock !== undefined && Number(stock) < 0) {
    throw new ApiError(400, "Stock cannot be negative");
  }

  if (images !== undefined && !Array.isArray(images)) {
    throw new ApiError(400, "Images must be an array");
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};

// create me required fields strict
// update me optional fields allowed
// but provided fields valid hone chahiye