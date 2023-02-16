const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return { type: null, message: allSales };
};

const findById = async (salesId) => {
  const sales = await salesModel.findById(salesId);
  if (!sales.length) {
    return {
      type: 404,
      message: 'Sale not found',
    };
  }
  return { type: null, message: sales };
};

module.exports = {
  getAllSales,
  findById,
};