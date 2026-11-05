import bd from '../bd.js';

export default function buscarPacotePorId(req, res) {
  const { id } = req.params;
  const query = `
    SELECT 
      p.id,
      p.id_cliente,
      c.nome AS cliente_nome,
      p.id_destino,
      d.cidade AS destino_cidade,
      DATE_FORMAT(p.data_ida, '%Y-%m-%d') AS data_ida,
      DATE_FORMAT(p.data_volta, '%Y-%m-%d') AS data_volta,
      p.preco,
      p.status
    FROM pacote_viagem p
    INNER JOIN cliente c ON p.id_cliente = c.id
    INNER JOIN destino_turistico d ON p.id_destino = d.id
    WHERE p.id = ?
  `;
  bd.query(query, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.length === 0) return res.status(404).json({ msg_erro: 'Pacote não encontrado' });
    res.json(resultado[0]);
  });
}
