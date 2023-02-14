const { expect } = require("chai");
const sinon = require("sinon");

const productsService = require("../../../src/services/products.service");

const productsModel = require("../../../src/models/products.model");

const {
  productsDataBase,
  product,
  newProduct,
  newProductDataBase,
  newName,
  removeId,
} = require("../../mock/products.mock");

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
      sinon.stub(productsModel, "findById").resolves([product]);

      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(product);
    });
  });
  
  describe('Testa a camada service para a função "insertProduct"', function () {
      
    it('Faz a inserção de um novo produto', async function () {

      sinon.stub(productsModel, 'insertProduct')
        .resolves(newProduct);
      sinon.stub(productsModel, 'findById')
        .resolves(newProductDataBase);

      const response = await productsService.insertProduct('productX');

      expect(response).to.be.deep.equal(newProductDataBase)
    });
  });

  describe('Testa a camada service para a função "updateProductById"', function () {

    it('Faz a atualização de um produto pelo seu id', async function () {

      const result = {
        type: 200,
        id: 1,
        name: 'O machado do Homem de Ferro'
      }

      sinon.stub(productsModel, 'findById').resolves([product]);
      sinon.stub(productsModel, 'updateProductById').resolves([newName]);

      const response = await productsService.updateProductById('O machado do Homem de Ferro', 1);

      expect(response).to.be.deep.equal(result);
    })

    it('Retorna um erro ao tentar atualizar um produto pelo Id inexistente', async function () {

      const result = {
        type: 404,
        message: 'Product not found',
      }

      sinon.stub(productsModel, 'updateProductById').resolves([]);

      const response = await productsService.updateProductById('O machado do Homem de Ferro', 99);

      expect(response).to.be.deep.equal(result);

    });
  });

  describe('Testa a camada service para a função de "removeProductById"', function () {

    it('Faz a remoção de um produto pelo seu id', async function () {

      const result = {
        type: 204,
        message: ''
      }

      sinon.stub(productsModel, 'findById').resolves([product]);
      sinon.stub(productsModel, 'removeProductById').resolves(undefined);

      const response = await productsService.removeProductById(1);

      expect(response).to.be.deep.equal(result);

    });

    it('Retorna um erro ao tentar fazer a remoção de um produto com o id inexistente', async function () {

      const result = {
        type: 404,
        message: 'Product not found'
      };

      sinon.stub(productsModel, 'findById').resolves([]);

      const response = await productsService.removeProductById(999);

      expect(response).to.be.deep.equal(result);

    });
  });

});
