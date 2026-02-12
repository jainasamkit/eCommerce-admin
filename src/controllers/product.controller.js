import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import productService from "../services/product.service.js";
const addProduct = async (req, res) => {
  try {
    const productData = req.body;

    const files = req.files;
    const userId = req.user.id;
    const product = await productService.addProduct({
      productData,
      userId,
      files,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, "Product added successfully", product));
  } catch (error) {
    throw ApiError.internal();
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { products, total } = await productService.getProducts(page, limit);

    return res.status(200).json(
      new ApiResponse(true, "Products fetched successfully", {
        page,
        limit,
        products,
        total,
      })
    );
  } catch (error) {
    throw ApiError.internal();
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully", product));
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal();
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(id, productData);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Product updated successfully", updatedProduct)
      );
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal();
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = { isDeleted: true };
    const deletedProduct = await productService.updateProduct(id, productData);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Product deleted successfully", deletedProduct)
      );
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      throw ApiError.notFound("Product not found");
    }
    throw ApiError.internal();
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
