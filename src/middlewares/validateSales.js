const productsModel = require('../models/products.model');

const validateQuantityExists = (req, res, next) => {
  const quantity = req.body;

  const qntt = quantity.some((qtt) => qtt.quantity);

  if (!qntt) return res.status(400).json({ message: '"quantity" is required' });

  next();
};  

const validateQtt = (req, res, next) => {
  const sale = req.body;

  const someQuantity = sale.some((p) => p.quantity <= 0);

  if (someQuantity) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateId = (req, res, next) => {
  const productId = req.body;

  const noId = productId.find((id) => id.productId);

  if (!noId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateProductId = async (req, res, next) => {
  const product = req.body;

  const prodId = await productsModel.getAllProducts();

  const productId = product.map((prod) => prod.productId);

  const id = prodId.map((prod) => prod.id);

  const validate = productId.every((i) => id.includes(i));

  if (!validate) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  next();
};

module.exports = {
  validateQuantityExists,
  validateQtt,
  validateId,
  validateProductId,
};
