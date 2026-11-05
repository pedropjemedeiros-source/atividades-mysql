import bd from '../bd.js';

export default function atualizarEstoque(req, res) {
  const { id_produto, cnpj_filial } = req.params;
  const { preco, quantidade, validade } = req.body;

  const query = `
    UPDATE Estoque 
    SET preco = ?, quantidade = ?, validade = ?
    WHERE id_produto = ? AND cnpj_filial = ?
  `;
  bd.query(query, [preco, quantidade, validade, id_produto, cnpj_filial], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Registro de estoque não encontrado' });
    res.json({ id_produto, cnpj_filial, preco, quantidade, validade });
  });
}
