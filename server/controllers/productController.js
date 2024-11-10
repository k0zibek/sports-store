import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs, { read } from "fs";

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
		const products = new productModel({ ...req.fields, slug: slugify(name) });
		if (photo) {
			products.photo.data = fs.readFileSync(photo.path);
			products.photo.contentType = photo.type;
		}
		await products.save();
		res.status(200).send({
			success: true,
			message: "Produdct created Successfully",
			products,
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
			message: "All Products ",
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
		const product = await productModel.find({ slug: req.params.slug }).select("-photo").populate("category");
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
		const products = await productModel.findByIdAndUpdate(
			req.params.pid,
			{
				...req.fields,
				slug: slugify(name),
			},
			{ new: true }
		);
		if (photo) {
			products.photo.data = fs.readFileSync(photo.path);
			products.photo.contentType = photo.type;
		}
		await products.save();
		res.status(200).send({
			success: true,
			message: "Produdct updated Successfully",
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error while updating product",
			error,
		});
	}
};
