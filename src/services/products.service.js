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

module.exports = { getProducts, findById, insertProduct };