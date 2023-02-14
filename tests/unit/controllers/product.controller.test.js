const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsController = require("../../../src/controllers/products.controller");

const productsService = require("../../../src/services/products.service");

const { productsDataBase, product, newProduct, newProductDataBase  } = require("../../mock/products.mock");

describe('Testa a camada controller para a rota "/products"', function () {

  afterEach(function () {
    sinon.restore();
  });

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

  describe('Testa a camada controller para a função "insertProduct"', function () {

    it('Faz a inserção de um novo produto', async function () {
       const req = { body: newProduct };
       const res = {};

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();

       sinon
         .stub(productsService, 'insertProduct')
         .resolves([newProductDataBase]);

       await productsController.insertProduct(req, res);

       expect(res.status).to.have.been.calledWith(201);
       expect(res.json).to.have.been.calledWith(newProductDataBase);
    });
  });

  describe('Testa a camada controller para a função "updateProductById"', function () {

    it('Faz atualização do produto pelo id', async function () {

      const req = {
        params: { id: 1 },
        body: { name: 'O machado do Homem de Ferro' }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProductById')
        .resolves({ type: 200, id: 1, name: 'O machado do Homem de Ferro' });

      await productsController.updateProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);  
    });

    it('Testa fazer a atualização de um produto pelo id sem sucesso', async function () {

      const req = {
        params: { id: 999 },
        body: { name: 'O machado do Homem de Ferro' }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProductById')
        .resolves({ type: 404, message: 'Product not found' });
      
      await productsController.updateProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('Testa a camada controller para a função "removeProductById"', function () {

    it('Faz a remoção do produto através do id', async function () {

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'removeProductById')
        .resolves({
          type: 204,
          message: '',
        });
      
      await productsController.removeProductById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Retorna um erro caso o id não seja válido', async function () {
      
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'removeProductById')
        .resolves({
          type: 404,
          message: 'Product not found'
        });
      
      await productsController.removeProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found'
      });
    });
  });
});
