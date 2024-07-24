const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  inStock: { type: Boolean, default: true }
  });
  // Text index for searching by name and category
productSchema.index({ name: 'text', category: 'text' });

  const Product = mongoose.model('Product', productSchema,'products');
  module.exports=Product;