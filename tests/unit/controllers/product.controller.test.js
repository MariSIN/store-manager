const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsController = require("../../../src/controllers/products.controller");

const productsService = require("../../../src/services/products.service");

const { productsDataBase, product } = require("../../mock/products.mock");

describe('Testa a camada controller para a rota "/products"', function () {

  describe('Testa a chamada da função "getProducts"', function () {
    it("Busca por todos os produtos cadastrados", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "getProducts").resolves({
        type: null,
        message: productsDataBase,
      });

      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsDataBase);
    });

    it('Busca um produto cadastrado', async function () {
      
      const req = { params: { id: 1 }};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'findById').resolves({ type: null, message: product });

      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });
  });
});
