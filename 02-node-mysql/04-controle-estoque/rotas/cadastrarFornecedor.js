import bd from '../bd.js';

export default function cadastrarFornecedor(req, res) {
  const { nome, telefone, endereco } = req.body;
  if (!nome || !telefone || !endereco) {
    return res.status(400).json({ msg_erro: 'Campos nome, telefone e endereco são obrigatórios' });
  }

  const query = 'INSERT INTO Fornecedor (nome, telefone, endereco) VALUES (?, ?, ?)';
  bd.query(query, [nome, telefone, endereco], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ id: resultado.insertId, nome, telefone, endereco });
  });
}
