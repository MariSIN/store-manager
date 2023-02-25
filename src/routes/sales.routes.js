const express = require('express');

const salesRouter = express.Router();
const {
  insertSales,
  getAllSales,
  findById,
} = require('../controllers/sales.controllers');

const {
  validateQuantityExists,
  validateQtt,
  validateId,
  validateProductId,
} = require('../middlewares/validateSales');

salesRouter.get('/', getAllSales);
salesRouter.get('/:id', findById);
salesRouter.post('/',
  validateQtt,
  validateQuantityExists,
  validateId,
  validateProductId,
  insertSales);
module.exports = salesRouter;