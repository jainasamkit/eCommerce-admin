import { Product } from "../models/product.model.js";

const findProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    const error = new Error("PRODUCT_NOT_FOUND");
    throw error;
  }

  return product;
};

const saveProduct = async (product) => {
  try {
    await product.save();
    return product;
  } catch (error) {
    throw new Error("PRODUCT_SAVE_FAILED");
  }
};

const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await saveProduct(product);
  } catch (error) {
    throw new Error("PRODUCT_CREATION_FAILED");
  }
};

const getProducts = async () => {
  try {
    return await Product.find({ isDeleted: false });
  } catch (error) {
    throw new Error("PRODUCT_FETCH_FAILED");
  }
};

export { findProductById, saveProduct, createProduct, getProducts };
