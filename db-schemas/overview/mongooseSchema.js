const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/products');

const { Schema, model } = mongoose;

const styleSchema = new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: Array,
});

const productSchema = new Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: Array,
  styles: [stylesSchema],
  related: Array,
});

const styleModel = model('styleModel', styleSchema);
const productModel = model('productModel', productSchema);
