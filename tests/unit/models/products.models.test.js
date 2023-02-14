const sinon = require('sinon');
const { expect } = require("chai");

const connection = require('../../../src/models/db/connection');
const productModel = require('../../../src/models/products.model');
const { productsDataBase, product, newProduct, newName, removeId } = require('../../mock/products.mock');

describe('Testa a camada model para a rota "/products"', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testa a camada model para a função "getProducts"', function () {
    
    it("Busca por todas os produtos cadastrados", async function () {

      sinon.stub(connection, "execute").resolves([productsDataBase]);

      const response = await productModel.getAllProducts();

      expect(response).to.be.deep.equal(productsDataBase);
    });
  });

  describe('Testa a camada model para a função "findById"', function () {

    it('Busca produtos a partir de seu "id"', async function () {

      sinon.stub(connection, "execute").resolves([product]);

      const result = await productModel.findById(1);

      expect(result).to.be.deep.equal(product);
    });
  });

  describe('Testa a camada model para a função "insertProduct"', function () {
    it('Faz a inserção de um novo produto', async function () {

      sinon.stub(connection, 'execute').resolves([newProduct]);

      const result = await productModel.insertProduct({
        name: 'ProdutoX',
      });

      expect(result).to.be.equal(newProduct);
    });
  });

  describe('Testa a camada model para a função "updateById"', function () {
    it('Faz atualização de um produto pelo seu id', async function () {

      sinon.stub(connection, 'execute').resolves([newName]);

      const result = await productModel.updateProductById({
        id: 1,
        name: 'O machado do Homem de Ferro',
      });

      expect(result).to.be.equal(newName);
    });
  });

  describe('Testa a camada model para a função "removeProductById"', function () {

    it('Faz a remoção de um produto com sucesso', async function () {

      const id = 1;

      sinon.stub(connection, 'execute').resolves([removeId])

      const result = await productModel.removeProductById(id);

      expect(result).to.be.equal(removeId);
    });
  });
});