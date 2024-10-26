import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import router from './routes/productRoutes.js';
import connectDB from './config/db.js';

// configure env
dotenv.config();
const PORT = process.env.PORT;
const DEV_MODE = process.env.DEV_MODE;

// database config
connectDB();

// REST object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/products', router);
app.use(cors());

// REST api
app.get('/', (req, res) => {
	res.send('<h1>API is working</h1>');
});

// run listen
app.listen(PORT, () => {
	console.log(`Server running on ${DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
