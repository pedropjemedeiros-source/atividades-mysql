import bd from '../bd.js';

export default function listarEstoque(req, res) {
  const query = `
    SELECT 
      e.id_produto,
      p.nome AS produto_nome,
      e.cnpj_filial,
      f.nome AS filial_nome,
      e.preco,
      e.quantidade,
      DATE_FORMAT(e.validade, '%Y-%m-%d') AS validade
    FROM Estoque e
    INNER JOIN Produto p ON e.id_produto = p.id
    INNER JOIN Filial f ON e.cnpj_filial = f.cnpj
    ORDER BY p.nome ASC
  `;
  bd.query(query, (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.json(resultado);
  });
}
