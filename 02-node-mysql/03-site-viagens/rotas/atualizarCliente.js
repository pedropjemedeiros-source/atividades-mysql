import bd from '../bd.js';

export default function atualizarCliente(req, res) {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  const query = 'UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE id = ?';
  bd.query(query, [nome, email, telefone, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Cliente não encontrado' });
    res.json({ id, nome, email, telefone });
  });
}
