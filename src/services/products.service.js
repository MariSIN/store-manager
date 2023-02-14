const productsModel = require('../models/products.model');

const getProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const findById = async (productId) => {
  const [product] = await productsModel.findById(productId);
  if (!product) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return { type: null, message: product };
};

const insertProduct = async ({ name }) => {
  const { insertId } = await productsModel.insertProduct({ name });

  const result = await productsModel.findById(insertId);

  return result;
};

const updateProductById = async (name, id) => {
  const hasProduct = await productsModel.findById(id);
  if (!hasProduct.length) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  await productsModel.updateProductById(name, id);

  return {
    type: 200,
    id,
    name,
  };
};

const removeProductById = async (id) => {
  const hasProduct = await productsModel.findById(id);
  if (!hasProduct.length) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  await productsModel.removeProductById(id);

  return {
    type: 204,
    message: '',
  };
};

module.exports = {
  getProducts,
  findById,
  insertProduct,
  updateProductById,
  removeProductById,
};
