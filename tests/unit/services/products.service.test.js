const { expect } = require("chai");
const sinon = require("sinon");

const productsService = require("../../../src/services/products.service");

const productsModel = require("../../../src/models/products.model");

const { productsDataBase, product } = require("../../mock/products.mock");

describe('Testa a camada Service para a rota "/products"', function () {
  afterEach(function () { sinon.restore() });

  describe('Testa a camada service para a função "getProducts"', function () {

    it("Busca por todos os produtos cadastrados", async function () {
      
      sinon.stub(productsModel, "getAllProducts").resolves(productsDataBase);

      const result = await productsService.getProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productsDataBase);
    });

    it("Retorna um erro caso o produto não exista", async function () {
      sinon.stub(productsModel, "findById").resolves([]);

      const result = await productsService.findById(99);

      expect(result.type).to.be.equal(404);

      expect(result.message).to.be.equal("Product not found");
    });

    it('Retorna o produto caso o "id" exista', async function () {
      sinon.stub(productsModel, "findById").resolves(product);

      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(product);
    });
  });
});
