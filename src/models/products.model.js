const connection = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insertProduct = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return result;
};

const updateProductById = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
  );
  return result;
};

module.exports = {
  getAllProducts,
  findById,
  insertProduct,
  updateProductById,
};
