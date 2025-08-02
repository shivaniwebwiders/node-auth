const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api', productRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
