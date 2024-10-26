const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/products', productRoutes);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is working');
});

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.error(error.message));
