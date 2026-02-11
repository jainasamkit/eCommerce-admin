import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  addProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service.js";
const addProduct = async (req, res) => {
  try {
    const productData = req.body;

    const userId = req.user.id;
    const product = await addProductService(productData, userId);
    return res
      .status(201)
      .json(new ApiResponse(201, "Product added successfully", product));
  } catch (error) {
    if (error.message === "PRODUCT_CREATION_FAILED") {
      throw ApiError.internal("Failed to create product");
    }
    if (error.message === "PRODUCT_SAVE_FAILED") {
      throw ApiError.internal("Failed to save product");
    }
    throw ApiError.internal("Error Adding Product");
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { products, total } = await getProductsService(page, limit);

    return res.status(200).json(
      new ApiResponse(true, "Products fetched successfully", {
        page,
        limit,
        products,
        total,
      })
    );
  } catch (error) {
    if (error.message === "PRODUCT_FETCH_FAILED") {
      throw ApiError.internal("Failed to fetch products");
    }
    throw ApiError.internal("Error Fetching Products");
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully", product));
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal("Error Fetching Product");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await updateProductService(id, productData);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Product updated successfully", updatedProduct)
      );
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal("Error Updating Product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = { isDeleted: true };
    const deletedProduct = await updateProductService(id, productData);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Product deleted successfully", deletedProduct)
      );
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal("Error Deleting Product");
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
