import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  addProductService,
  getProductsService,
} from "../services/product.service.js";
const addProduct = async (req, res) => {
  try {
    const productdata = req.body;
    const product = await addProductService(productdata);
    return res
      .status(201)
      .json(new ApiResponse(201, "Product added successfully", product));
  } catch (error) {
    if (error.message === "PRODUCT_CREATION_FAILED") {
      return ApiError.internal("Failed to create product");
    }
    if (error.message === "PRODUCT_SAVE_FAILED") {
      return ApiError.internal("Failed to save product");
    }
    ApiError.internal("Error Adding Product");
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    return res
      .status(200)
      .json(new ApiResponse(true, "Products fetched successfully", products));
  } catch (error) {
    if (error.message === "PRODUCT_FETCH_FAILED") {
      return ApiError.internal("Failed to fetch products");
    }
    ApiError.internal("Error Fetching Products");
  }
};

const getProductById = async (req, res) => {};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
