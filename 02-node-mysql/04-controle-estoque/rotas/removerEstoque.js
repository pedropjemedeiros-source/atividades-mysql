import bd from '../bd.js';

export default function removerEstoque(req, res) {
  const { id_produto, cnpj_filial } = req.params;
  const query = 'DELETE FROM Estoque WHERE id_produto = ? AND cnpj_filial = ?';
  bd.query(query, [id_produto, cnpj_filial], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Registro de estoque não encontrado' });
    res.json({ mensagem: 'Estoque removido com sucesso' });
  });
}
