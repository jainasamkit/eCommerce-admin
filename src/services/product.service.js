import productRepository from "../repository/product.repository.js";

const addProduct = async (productData, userId, files) => {
  try {
    return await productRepository.createProduct({
      ...productData,
      createdBy: userId,
      images: files.map((file) => file.path),
    });
  } catch (error) {
    throw error;
  }
};

const getProducts = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    return await productRepository.getProducts(skip, limit);
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await productRepository.findProductById(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const product = await productRepository.updateProduct(id, productData);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    return product;
  } catch (error) {
    throw error;
  }
};
export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
};
