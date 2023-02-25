const salesService = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findById(id);
  
  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const insertSales = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.insertSales(sale);

  if (type) return res.status(type).json(message);

  return res.status(201).json(message);
};

module.exports = {
  getAllSales,
  findById,
  insertSales,
};