import bd from '../bd.js';

export default function listarDestinos(req, res) {
  const query = 'SELECT * FROM destino_turistico ORDER BY cidade ASC';
  bd.query(query, (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.json(resultado);
  });
}
