import mongoose from "mongoose";

export const validateObjectId = (req, res, next) => {
	const { pid } = req.params;
	if (pid && !mongoose.Types.ObjectId.isValid(pid)) {
		return res.status(400).json({ success: false, message: "Invalid Product ID" });
	}
	next();
};
