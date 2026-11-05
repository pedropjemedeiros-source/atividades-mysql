import bd from '../bd.js';

export default function listarProdutos(req, res) {
  const query = `
    SELECT 
      p.id,
      p.nome,
      p.id_fornecedor,
      f.nome AS fornecedor_nome,
      i.descricao AS identificacao_descricao,
      i.observacao AS identificacao_observacao
    FROM Produto p
    INNER JOIN Fornecedor f ON p.id_fornecedor = f.id
    LEFT JOIN Identificacao i ON p.id = i.id_produto
    ORDER BY p.nome ASC
  `;
  bd.query(query, (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.json(resultado);
  });
}
