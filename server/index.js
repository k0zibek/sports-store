import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import router from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

// configure env
dotenv.config();
const PORT = process.env.PORT;
const DEV_MODE = process.env.DEV_MODE;

// database config
connectDB();

// REST object
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/auth", router);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// REST api
app.get("/", (req, res) => {
	res.send("<h1>API is working</h1>");
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Internal Server Error",
		error: err.message,
	});
});

// run listen
app.listen(PORT, () => {
	console.log(`Server is running in ${DEV_MODE} mode on port ${PORT}`.bgCyan.white);
	console.log(`API Documentation: http://localhost:${PORT}`.cyan);
});

// /api/v1/product/product-photo/676066a3c6e93b169816db83
// /api/v1/product/update-product/676066a3c6e93b169816db83
// 676066a3c6e93b169816db83
