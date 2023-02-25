const connection = require('./db/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale.id AS saleId, sale.date, sproducts.product_id AS productId, sproducts.quantity
     FROM StoreManager.sales AS sale
     INNER JOIN 
     StoreManager.sales_products AS sproducts
     ON sproducts.sale_id = sale.id
     ORDER BY sale.id, productId`,
  );
  return result;
};

const findById = async (salesId) => {
  const [result] = await connection.execute(
    `SELECT sale.date, sproducts.product_id AS productId, sproducts.quantity
     FROM StoreManager.sales_products AS sproducts
     INNER JOIN
     StoreManager.sales AS sale
     ON sale.id= sproducts.sale_id 
      WHERE id = ?
      ORDER BY sale.id, productId`,
    [salesId],
  );
  return result;
};

const insertSales = async () => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return result;
};

const insertSalesProducts = async (sale, product) => {
  const result = await connection.execute(
    `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [sale, product.productId, product.quantity],
  );
  return result;
};

module.exports = {
  getAllSales,
  findById,
  insertSales,
  insertSalesProducts,
};
