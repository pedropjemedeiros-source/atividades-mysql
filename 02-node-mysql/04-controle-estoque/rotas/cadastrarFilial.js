import bd from '../bd.js';

export default function cadastrarFilial(req, res) {
  const { cnpj, nome, telefone, endereco } = req.body;
  if (!cnpj || !nome || !telefone || !endereco) {
    return res.status(400).json({ msg_erro: 'Campos cnpj, nome, telefone e endereco são obrigatórios' });
  }

  const query = 'INSERT INTO Filial (cnpj, nome, telefone, endereco) VALUES (?, ?, ?, ?)';
  bd.query(query, [cnpj, nome, telefone, endereco], (erro) => {
    if (erro) return res.status(500).json({ msg_erro: erro.message });
    res.status(201).json({ cnpj, nome, telefone, endereco });
  });
}
