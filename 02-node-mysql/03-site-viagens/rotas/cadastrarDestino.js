import bd from '../bd.js';

export default function cadastrarDestino(req, res) {
  const { cidade, estado, pais, descricao } = req.body;
  if (!cidade || !estado) {
    return res.status(400).json({ msg_erro: 'Campos cidade e estado são obrigatórios' });
  }

  const query = 'INSERT INTO destino_turistico (cidade, estado, pais, descricao) VALUES (?, ?, ?, ?)';
  bd.query(query, [cidade, estado, pais || 'Brasil', descricao || null], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ id: resultado.insertId, cidade, estado, pais: pais || 'Brasil', descricao });
  });
}
