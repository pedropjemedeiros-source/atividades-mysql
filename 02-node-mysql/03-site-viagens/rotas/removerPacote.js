import bd from '../bd.js';

export default function removerPacote(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM pacote_viagem WHERE id = ?';
  bd.query(query, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Pacote não encontrado' });
    res.json({ mensagem: 'Pacote removido com sucesso' });
  });
}
