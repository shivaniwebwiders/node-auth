const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', categoryRoutes); 
app.use('/api/products', productRoutes);

module.exports = app;
