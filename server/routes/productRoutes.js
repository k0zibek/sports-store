import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
	createProductController,
	updateProductController,
	getAllProductsController,
	getSingleProductController,
	getProductPhotoController,
	deleteProductController,
} from "./../controllers/productController.js";
import formidable from "express-formidable";
import { validateObjectId } from "./../middlewares/validationMiddleware.js";

const router = express.Router();

// Create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// Update product
router.put("/update-product/:pid", requireSignIn, isAdmin, validateObjectId, formidable(), updateProductController);

// Get all products
router.get("/get-products", getAllProductsController);

// Get single product
router.get("/get-product/:slug", getSingleProductController);

// Get product photo
router.get("/product-photo/:pid", validateObjectId, getProductPhotoController);

// Delete product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, validateObjectId, deleteProductController);

export default router;
