import bd from '../bd.js';

export default function removerDestino(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM destino_turistico WHERE id = ?';
  bd.query(query, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Destino não encontrado' });
    res.json({ mensagem: 'Destino removido com sucesso' });
  });
}
