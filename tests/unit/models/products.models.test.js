const sinon = require('sinon');
const { expect } = require("chai");

const connection = require('../../../src/models/db/connection');
const productModel = require('../../../src/models/products.model');
const { productsDataBase, product } = require('../../mock/products.mock');

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
});