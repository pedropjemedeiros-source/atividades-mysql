import bd from '../bd.js';

export default function listarFiliais(req, res) {
  const query = 'SELECT * FROM Filial ORDER BY nome ASC';
  bd.query(query, (erro, resultado) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.json(resultado);
  });
}
