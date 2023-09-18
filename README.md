
# Projeto Store Manager!

Uma API utilizando a arquitetura MSC (model-service-controller)!

A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é ser RESTful.


## Stack utilizada

**Back-end:** Node, Express, Docker, MySQL, Mocha, SQL


## Funcionalidades

- Listar um ou mais produtos
- Cadastrar Produtos
- Atualizar um produto
- Deletar um produto
- Cadastrar vendas
- Listar uma ou mais vendas
- Deletar venda


## Documentação da API

#### Retorna a lista de produtos

```http
  GET /products
```

#### Retorna apenas o produto com o id presente na URL

```http
  GET /products/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cadastra um produto
```http
    POST /products
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do produto para cadastrar|

#### Cadastra vendas
```http
    POST /sales
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `productId`      | `number` | **Obrigatório**. O ID do produto cadastrado|
| `quantity`      | `number` | **Obrigatório**. A quantidade de produto vendido|

#### Retorna a lista de vendas
```http
    GET /sales
```
#### Retorna apenas uma venda com o id presente na URL
```http
    GET /sales/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda cadastrada|

#### Atualiza um produto com o id presente na URL
```http
    PUT /products/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto cadastrado|
| `name`      | `string` | **Obrigatório**. O novo nome do produto|

#### Deleta um produto com o id presente na URL
```http
     DELETE /products/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto cadastrado a ser deletado|

#### Deleta uma venda com o id presente na URL
```http
    DELETE /sales/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda cadastrada a ser deletada|


## Instalação

Suba o container docker

```bash
  docker-compose up -d
```

Use o comando docker
```bash
  exec -it store_manager bash
```

- Vai abrir um terminal interativo, que estará rodando em segundo plano

Instale as dependências
```bash
  npm install
```
⚠️ Atenção: TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.
    
## Autores

- [@MariSIN](https://github.com/MariSIN)
