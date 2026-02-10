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
    const productdata = req.body;
    productdata.isDeleted = false;
    const userId = req.user.id;
    const product = await addProductService(productdata, userId);
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
    const products = await getProductsService();
    return res
      .status(200)
      .json(new ApiResponse(true, "Products fetched successfully", products));
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
    console.log(product);
    if (!product) {
      throw ApiError.notFound("Product not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully", product));
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    if (error.message === "PRODUCT_DELETED") {
      console.log("final hello");

      throw ApiError.notFound("Product has been deleted");
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
    if (error.message === "PRODUCT_DELETED") {
      throw ApiError.notFound("Product has been deleted");
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
    if (error.message === "PRODUCT_DELETED") {
      throw ApiError.notFound("Product has already been deleted");
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
