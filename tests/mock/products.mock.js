const productsDataBase = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimeto',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  }
];

const product = {
  id: 1,
  name: 'Martelo de Thor',
}

const newProduct = {
  id: 4,
  name: 'ProdutoX'
}

const newProductDataBase = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimeto",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
  {
    id: 4,
    name: "ProdutoX",
  },
];

const newName = {
  id: 1,
  name: 'O machado do Homem de Ferro',
}

const removeId = [
  {
    id: 2,
    name: 'Traje de encolhimeto',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  }
];




module.exports = { productsDataBase, product, newProduct, newProductDataBase, newName, removeId };