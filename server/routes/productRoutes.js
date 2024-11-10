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

const router = express.Router();

// routes
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// update
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

// get all products
router.get("/get-products", getAllProductsController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", getProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;
