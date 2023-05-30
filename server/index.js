/* eslint-disable no-console */
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const controller = require('./controller');
const logger = require('./middleware/logger');

// Serves up all static and generated assets in ../client/dist.

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(morgan('tiny'));
app.use(cors());

// Add a middleware to log HTTP requests
app.use(logger);

// Set up our routes

// product
app.get('/products', controller.product.getProducts);
app.get('/products/:productId', controller.product.getProduct);
app.get('/products/:productId/styles', controller.product.getProductStyle);
app.get('/products/:productId/related', controller.product.getRelated);

/* ---------------- Server listens ---------------- */

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
