const express = require('express');

const salesController = require('../controllers/sales.controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.findById);

module.exports = salesRouter;