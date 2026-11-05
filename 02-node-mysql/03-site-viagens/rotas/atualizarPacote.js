import bd from '../bd.js';

export default function atualizarPacote(req, res) {
  const { id } = req.params;
  const { id_cliente, id_destino, data_ida, data_volta, preco, status } = req.body;

  const query = `
    UPDATE pacote_viagem 
    SET id_cliente = ?, id_destino = ?, data_ida = ?, data_volta = ?, preco = ?, status = ?
    WHERE id = ?
  `;
  bd.query(query, [id_cliente, id_destino, data_ida, data_volta, preco, status, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ msg_erro: 'Pacote não encontrado' });
    res.json({ id, id_cliente, id_destino, data_ida, data_volta, preco, status });
  });
}
