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

const insertSalesProducts = async (sale, product) => {
  const result = await salesModel.insertSalesProducts(sale, product);
  return result;
};

const insertSales = async (sales) => {
  const [{ insertId }] = await salesModel.insertSales();

  const response = sales.map(async (sl) => insertSalesProducts(insertId, sl));

  await Promise.all(response);

  return {
    type: 201,
    message: {
      id: insertId,
      itemsSold: sales,
    },
  };
  };
  
module.exports = {
  getAllSales,
  findById,
  insertSales,
};