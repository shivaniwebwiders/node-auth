const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', categoryRoutes); 
module.exports = app;
