import bd from '../bd.js';

export default function cadastrarProduto(req, res) {
  const { id_fornecedor, nome, descricao, observacao } = req.body;
  if (!id_fornecedor || !nome) {
    return res.status(400).json({ msg_erro: 'Campos id_fornecedor e nome são obrigatórios' });
  }

  const queryProduto = 'INSERT INTO Produto (id_fornecedor, nome) VALUES (?, ?)';
  bd.query(queryProduto, [id_fornecedor, nome], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });

    const idProduto = resultado.insertId;

    if (descricao) {
      const queryIdent = 'INSERT INTO Identificacao (id_produto, descricao, observacao) VALUES (?, ?, ?)';
      bd.query(queryIdent, [idProduto, descricao, observacao || null], (errIdent) => {
        if (errIdent) return res.status(500).json({ msg_erro: errIdent.message });
        res.status(201).json({ id: idProduto, id_fornecedor, nome, descricao, observacao });
      });
    } else {
      res.status(201).json({ id: idProduto, id_fornecedor, nome });
    }
  });
}
