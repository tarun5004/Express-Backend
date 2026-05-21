const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../validators/product.validator");

const router = express.Router();

router.post("/", isAuthenticated, validateCreateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", isAuthenticated, validateUpdateProduct, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;