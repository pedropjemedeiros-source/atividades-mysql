import express from 'express';
import cors from 'cors';

// Fornecedores
import listarFornecedores from './rotas/listarFornecedores.js';
import cadastrarFornecedor from './rotas/cadastrarFornecedor.js';

// Produtos
import listarProdutos from './rotas/listarProdutos.js';
import cadastrarProduto from './rotas/cadastrarProduto.js';

// Filiais
import listarFiliais from './rotas/listarFiliais.js';
import cadastrarFilial from './rotas/cadastrarFilial.js';

// Estoque
import listarEstoque from './rotas/listarEstoque.js';
import cadastrarEstoque from './rotas/cadastrarEstoque.js';
import atualizarEstoque from './rotas/atualizarEstoque.js';
import removerEstoque from './rotas/removerEstoque.js';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints de Fornecedores
app.get('/fornecedores', listarFornecedores);
app.post('/fornecedores', cadastrarFornecedor);

// Endpoints de Produtos
app.get('/produtos', listarProdutos);
app.post('/produtos', cadastrarProduto);

// Endpoints de Filiais
app.get('/filiais', listarFiliais);
app.post('/filiais', cadastrarFilial);

// Endpoints de Estoque
app.get('/estoque', listarEstoque);
app.post('/estoque', cadastrarEstoque);
app.put('/estoque/:id_produto/:cnpj_filial', atualizarEstoque);
app.delete('/estoque/:id_produto/:cnpj_filial', removerEstoque);

const PORTA = process.env.PORT || 3002;

app.listen(PORTA, () => {
  console.log(`API de Controle de Estoque ativa na porta ${PORTA}.`);
});
