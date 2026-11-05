import bd from '../bd.js';

export default function cadastrarPacote(req, res) {
  const { id_cliente, id_destino, data_ida, data_volta, preco, status } = req.body;
  if (!id_cliente || !id_destino || !data_ida || !data_volta || preco === undefined) {
    return res.status(400).json({ msg_erro: 'Campos id_cliente, id_destino, data_ida, data_volta e preco são obrigatórios' });
  }

  const query = `
    INSERT INTO pacote_viagem (id_cliente, id_destino, data_ida, data_volta, preco, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  bd.query(query, [id_cliente, id_destino, data_ida, data_volta, preco, status || 'confirmado'], (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ id: resultado.insertId, id_cliente, id_destino, data_ida, data_volta, preco, status: status || 'confirmado' });
  });
}
