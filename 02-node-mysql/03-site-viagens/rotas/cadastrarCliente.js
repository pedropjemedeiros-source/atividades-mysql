import bd from '../bd.js';

export default function cadastrarCliente(req, res) {
  const { nome, email, telefone } = req.body;
  if (!nome || !email || !telefone) {
    return res.status(400).json({ msg_erro: 'Campos nome, email e telefone são obrigatórios' });
  }

  const query = 'INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?)';
  bd.query(query, [nome, email, telefone], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ id: resultado.insertId, nome, email, telefone });
  });
}
