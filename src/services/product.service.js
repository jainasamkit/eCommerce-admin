import {
  findProductById,
  saveProduct,
  createProduct,
  getProducts,
} from "../repository/product.repository.js";

const addProductService = async (productData) => {
  try {
    return await createProduct(productData);
  } catch (error) {
    throw new Error("PRODUCT_CREATION_FAILED");
  }
};

const getProductsService = async () => {
  try {
    return await getProducts();
  } catch (error) {
    throw new Error("PRODUCT_FETCH_FAILED");
  }
};

export { addProductService, getProductsService };
