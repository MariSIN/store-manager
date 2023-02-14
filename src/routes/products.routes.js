const express = require('express');
const validateProduct = require('../middlewares/valitadeProduct');

const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductsById);
productsRouter.post('/', validateProduct.validateName, productsController.insertProduct);

module.exports = productsRouter;
