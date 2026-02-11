import {
  findProductById,
  createProduct,
  getProducts,
  updateProduct,
} from "../repository/product.repository.js";

const addProductService = async (productData, userId) => {
  return await createProduct({ ...productData, createdBy: userId });
};

const getProductsService = async (page, limit) => {
  const skip = (page - 1) * limit;
  return await getProducts(skip, limit);
};

const getProductByIdService = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    const error = new Error("PRODUCT_NOT_FOUND");
    throw error;
  }
  return product;
};

const updateProductService = async (id, productData) => {
  const product = await updateProduct(id, productData);
  if (!product) {
    const error = new Error("PRODUCT_NOT_FOUND");
    throw error;
  }
  return product;
};
export {
  addProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
};
