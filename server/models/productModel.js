import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "category",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		shipping: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("products", productSchema);
