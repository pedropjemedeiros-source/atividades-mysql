import bd from '../bd.js';

export default function listarPacotes(req, res) {
  const query = `
    SELECT 
      p.id,
      p.id_cliente,
      c.nome AS cliente_nome,
      p.id_destino,
      d.cidade AS destino_cidade,
      d.estado AS destino_estado,
      DATE_FORMAT(p.data_ida, '%Y-%m-%d') AS data_ida,
      DATE_FORMAT(p.data_volta, '%Y-%m-%d') AS data_volta,
      p.preco,
      p.status
    FROM pacote_viagem p
    INNER JOIN cliente c ON p.id_cliente = c.id
    INNER JOIN destino_turistico d ON p.id_destino = d.id
    ORDER BY p.data_ida ASC
  `;
  bd.query(query, (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.json(resultado);
  });
}
