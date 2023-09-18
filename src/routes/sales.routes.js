const express = require('express');

const salesRouter = express.Router();
const {
  insertSales,
  getAllSales,
  findById,
  updateSaleById,
  deleteSaleById,
} = require('../controllers/sales.controllers');

const {
  validateQuantityExists,
  validateQtt,
  validateId,
  validateProductId,
  validateSaleExists,
} = require('../middlewares/validateSales');

salesRouter.get('/', getAllSales);

salesRouter.get('/:id', findById);

salesRouter.post('/',
  validateQtt,
  validateQuantityExists,
  validateId,
  validateProductId,
  insertSales);

salesRouter.put(
  '/:id',
  validateQtt,
  validateQuantityExists,
  validateId,
  validateProductId,
  validateSaleExists,
  updateSaleById,
);

salesRouter.delete('/:id', deleteSaleById);

module.exports = salesRouter;