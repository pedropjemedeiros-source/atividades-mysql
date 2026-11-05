import bd from '../bd.js';

export default function atualizarDestino(req, res) {
  const { id } = req.params;
  const { cidade, estado, pais, descricao } = req.body;

  const query = 'UPDATE destino_turistico SET cidade = ?, estado = ?, pais = ?, descricao = ? WHERE id = ?';
  bd.query(query, [cidade, estado, pais, descricao, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Destino não encontrado' });
    res.json({ id, cidade, estado, pais, descricao });
  });
}
