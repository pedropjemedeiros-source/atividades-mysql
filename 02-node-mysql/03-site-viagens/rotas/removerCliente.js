import bd from '../bd.js';

export default function removerCliente(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM cliente WHERE id = ?';
  bd.query(query, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente removido com sucesso' });
  });
}
