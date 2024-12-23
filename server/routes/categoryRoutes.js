import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
	createCategoryController,
	updateCategoryController,
	getAllCategoriesController,
	getSingleCategoryController,
	deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// Update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//Get all categories
router.get("/all-categories", getAllCategoriesController);

// Single category
router.get("/single-category/:slug", getSingleCategoryController);

// Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;
