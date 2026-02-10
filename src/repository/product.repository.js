import { Product } from "../models/product.model.js";

const findProductById = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("PRODUCT_NOT_FOUND");
      throw error;
    }
    if (product.isDeleted) {
      const error = new Error("PRODUCT_DELETED");
      throw error;
    }

    return product;
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    if (error.message === "PRODUCT_DELETED") {
      throw new Error("PRODUCT_DELETED");
    }
    throw new Error("PRODUCT_FETCH_FAILED");
  }
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

const partialUpdateProduct = async (id, productData) => {
  try {
    const product = await findProductById(id);
    Object.assign(product, productData);
    return await saveProduct(product);
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    throw new Error("PRODUCT_UPDATE_FAILED");
  }
};

export {
  findProductById,
  saveProduct,
  createProduct,
  getProducts,
  partialUpdateProduct,
};
