import {
  findProductById,
  saveProduct,
  createProduct,
  getProducts,
  partialUpdateProduct,
} from "../repository/product.repository.js";

const addProductService = async (productData, userId) => {
  try {
    return await createProduct({ ...productData, createdBy: userId });
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

const getProductByIdService = async (id) => {
  try {
    const product = await findProductById(id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
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

const updateProductService = async (id, productData) => {
  try {
    const product = await findProductById(id);
    return await partialUpdateProduct(id, productData);
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    if (error.message === "PRODUCT_DELETED") {
      throw new Error("PRODUCT_DELETED");
    }
    throw new Error("PRODUCT_UPDATE_FAILED");
  }
};
export {
  addProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
};
