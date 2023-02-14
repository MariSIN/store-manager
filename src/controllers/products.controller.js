const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const [result] = await productsService.insertProduct({ name });
  return res.status(201).json(result);
};

const updateProductById = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.updateProductById(name, id);

  if (message) return res.status(type).json({ message });

  return res.status(type).json({ id, name });
};

const removeProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.removeProductById(id);
  if (message) return res.status(type).json({ message });

  res.status(204).json({ });
};

module.exports = {
  getProducts,
  getProductsById,
  insertProduct,
  updateProductById,
  removeProductById,
};
