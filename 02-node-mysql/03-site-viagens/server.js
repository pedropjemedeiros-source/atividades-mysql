import express from 'express';
import cors from 'cors';

// Rotas de Clientes
import listarClientes from './rotas/listarClientes.js';
import buscarClientePorId from './rotas/buscarClientePorId.js';
import cadastrarCliente from './rotas/cadastrarCliente.js';
import atualizarCliente from './rotas/atualizarCliente.js';
import removerCliente from './rotas/removerCliente.js';

// Rotas de Destinos
import listarDestinos from './rotas/listarDestinos.js';
import buscarDestinoPorId from './rotas/buscarDestinoPorId.js';
import cadastrarDestino from './rotas/cadastrarDestino.js';
import atualizarDestino from './rotas/atualizarDestino.js';
import removerDestino from './rotas/removerDestino.js';

// Rotas de Pacotes
import listarPacotes from './rotas/listarPacotes.js';
import buscarPacotePorId from './rotas/buscarPacotePorId.js';
import cadastrarPacote from './rotas/cadastrarPacote.js';
import atualizarPacote from './rotas/atualizarPacote.js';
import removerPacote from './rotas/removerPacote.js';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints de Clientes
app.get('/clientes', listarClientes);
app.get('/clientes/:id', buscarClientePorId);
app.post('/clientes', cadastrarCliente);
app.put('/clientes/:id', atualizarCliente);
app.delete('/clientes/:id', removerCliente);

// Endpoints de Destinos Turísticos
app.get('/destinos', listarDestinos);
app.get('/destinos/:id', buscarDestinoPorId);
app.post('/destinos', cadastrarDestino);
app.put('/destinos/:id', atualizarDestino);
app.delete('/destinos/:id', removerDestino);

// Endpoints de Pacotes de Viagem
app.get('/pacotes', listarPacotes);
app.get('/pacotes/:id', buscarPacotePorId);
app.post('/pacotes', cadastrarPacote);
app.put('/pacotes/:id', atualizarPacote);
app.delete('/pacotes/:id', removerPacote);

const PORTA = process.env.PORT || 3001;

app.listen(PORTA, () => {
  console.log(`API do Site de Viagens ativa na porta ${PORTA}.`);
});
