import bd from '../bd.js';

export default function buscarDestinoPorId(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM destino_turistico WHERE id = ?';
  bd.query(query, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.length === 0) return res.status(404).json({ msg_erro: 'Destino não encontrado' });
    res.json(resultado[0]);
  });
}
