import bd from '../bd.js';

export default function cadastrarEstoque(req, res) {
  const { id_produto, cnpj_filial, preco, quantidade, validade } = req.body;
  if (!id_produto || !cnpj_filial || preco === undefined || quantidade === undefined || !validade) {
    return res.status(400).json({ msg_erro: 'Todos os campos de estoque são obrigatórios' });
  }

  const query = 'INSERT INTO Estoque (id_produto, cnpj_filial, preco, quantidade, validade) VALUES (?, ?, ?, ?, ?)';
  bd.query(query, [id_produto, cnpj_filial, preco, quantidade, validade], (erro) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ id_produto, cnpj_filial, preco, quantidade, validade });
  });
}
