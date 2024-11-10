import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
	createCategoryController,
	updateCategoryController,
	allCategoriesController,
	singleCategoryController,
	deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes
// Create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// Update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//Get all categories
router.get("/", allCategoriesController);

// Single category
router.get("/single-category/:slug", singleCategoryController);

// Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;
