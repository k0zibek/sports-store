import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs, { read } from "fs";
import mongoose from "mongoose";

export const createProductController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } = req.fields;
		const { photo } = req.files;
		//validation
		switch (true) {
			case !name:
				return res.status(500).send({ error: "Name is required" });
			case !description:
				return res.status(500).send({ error: "Description is required" });
			case !price:
				return res.status(500).send({ error: "Price is required" });
			case !category:
				return res.status(500).send({ error: "Category is required" });
			case !quantity:
				return res.status(500).send({ error: "Quantity is required" });
			case photo && photo.size >= 2000000:
				return res.status(500).send({ error: "Photo is required and should be less than 2mb" });
		}
		const product = new productModel({ ...req.fields, slug: slugify(name) });
		if (photo) {
			product.photo.data = fs.readFileSync(photo.path);
			product.photo.contentType = photo.type;
		}
		await product.save();
		res.status(200).send({
			success: true,
			message: "Produdct created Successfully",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while creating product",
			error,
		});
	}
};

export const getAllProductsController = async (req, res) => {
	try {
		const products = await productModel
			.find({})
			.populate("category")
			.select("-photo")
			.limit(12)
			.sort({ createdAt: -1 });
		res.status(200).send({
			success: true,
			countTotal: products.length,
			message: "All Products",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while getting products",
			error: error.message,
		});
	}
};

export const getSingleProductController = async (req, res) => {
	try {
		const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
		if (!product) {
			return res.status(404).send({
				success: false,
				message: "Product not found",
			});
		}
		res.status(200).send({
			success: true,
			message: "Single Product Fetched",
			product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while getting single product",
			error: error.message,
		});
	}
};

export const getProductPhotoController = async (req, res) => {
	try {
		const product = await productModel.findById(req.params.pid).select("photo");
		if (product.photo.data) {
			res.set("Content-type", product.photo.contentType);
			return res.status(200).send(product.photo.data);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while getting product photo",
			error: error.message,
		});
	}
};

export const deleteProductController = async (req, res) => {
	try {
		await productModel.findByIdAndDelete(req.params.pid).select("-photo");
		res.status(200).send({
			success: true,
			message: "Product deleted Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while deleting product",
			error: error.message,
		});
	}
};

export const updateProductController = async (req, res) => {
	try {
		const { name, slug, description, price, category, quantity, shipping } = req.fields;
		const { photo } = req.files;
		// Check if product exists
		const product = await productModel.findById(req.params.pid);
		if (!product) {
			return res.status(404).send({ success: false, message: "Product not found" });
		}

		// Validation
		switch (true) {
			case !name:
				return res.status(400).send({ error: "Name is required" });
			case !description:
				return res.status(400).send({ error: "Description is required" });
			case !price:
				return res.status(400).send({ error: "Price is required" });
			case !category:
				return res.status(400).send({ error: "Category is required" });
			case !quantity:
				return res.status(400).send({ error: "Quantity is required" });
			case photo && photo.size >= 2000000:
				return res.status(400).send({ error: "Photo should be less than 2MB" });
			case !shipping:
				return res.status(400).send({ error: "Shipping is required" });
		}

		// Update product
		const updatedProduct = await productModel.findByIdAndUpdate(
			req.params.pid,
			{
				...req.fields,
				slug: slugify(name),
			},
			{ new: true }
		);

		if (photo) {
			updatedProduct.photo.data = fs.readFileSync(photo.path);
			updatedProduct.photo.contentType = photo.type;
		}

		await updatedProduct.save();

		res.status(200).send({
			success: true,
			message: "Product updated successfully",
			product: updatedProduct,
		});
	} catch (error) {
		console.error("Update product error:", error.stack);
		res.status(500).send({
			success: false,
			message: "Error while updating product",
			error: error.message,
		});
	}
};
