import { Product } from "../models/product.model.js";

const findProductById = async (id) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  return product;
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  return await saveProduct(product);
};

const getProducts = async (skip, limit) => {
  const products = await Product.find({ isDeleted: false })
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments({ isDeleted: false });
  return { products, total };
};

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: productData },
    { new: true, runValidators: true }
  );
  return product;
};

export { findProductById, createProduct, getProducts, updateProduct };
