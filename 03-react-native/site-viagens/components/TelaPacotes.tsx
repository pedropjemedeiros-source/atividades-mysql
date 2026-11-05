import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Pacote {
  id: number;
  id_cliente: number;
  cliente_nome: string;
  id_destino: number;
  destino_cidade: string;
  data_ida: string;
  data_volta: string;
  preco: number | string;
  status: string;
}

const API_URL = 'http://localhost:3001/pacotes';

export default function TelaPacotes() {
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [idCliente, setIdCliente] = useState('');
  const [idDestino, setIdDestino] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [preco, setPreco] = useState('');
  const [status, setStatus] = useState('confirmado');
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const carregarPacotes = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setPacotes(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os pacotes');
    }
  };

  useEffect(() => {
    carregarPacotes();
  }, []);

  const salvar = async () => {
    if (!idCliente.trim() || !idDestino.trim() || !dataIda.trim() || !dataVolta.trim() || !preco.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do pacote!');
      return;
    }

    try {
      const metodo = idEdicao ? 'PUT' : 'POST';
      const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;

      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_cliente: Number(idCliente),
          id_destino: Number(idDestino),
          data_ida: dataIda,
          data_volta: dataVolta,
          preco: parseFloat(preco.replace(',', '.')),
          status,
        }),
      });

      setIdCliente('');
      setIdDestino('');
      setDataIda('');
      setDataVolta('');
      setPreco('');
      setStatus('confirmado');
      setIdEdicao(null);
      carregarPacotes();
    } catch {
      Alert.alert('Erro', 'Falha ao salvar pacote');
    }
  };

  const editar = (item: Pacote) => {
    setIdEdicao(item.id);
    setIdCliente(item.id_cliente.toString());
    setIdDestino(item.id_destino.toString());
    setDataIda(item.data_ida);
    setDataVolta(item.data_volta);
    setPreco(item.preco.toString());
    setStatus(item.status);
  };

  const excluir = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      carregarPacotes();
    } catch {
      Alert.alert('Erro', 'Falha ao excluir pacote');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pacotes de Viagem</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="ID Cliente"
          value={idCliente}
          onChangeText={setIdCliente}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="ID Destino"
          value={idDestino}
          onChangeText={setIdDestino}
          keyboardType="numeric"
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Data Ida (AAAA-MM-DD)"
          value={dataIda}
          onChangeText={setDataIda}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Data Volta (AAAA-MM-DD)"
          value={dataVolta}
          onChangeText={setDataVolta}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Preço (R$)"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Status (ex: confirmado)"
          value={status}
          onChangeText={setStatus}
        />
      </View>

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>{idEdicao ? 'Atualizar Pacote' : 'Cadastrar Pacote'}</Text>
      </TouchableOpacity>

      <FlatList
        data={pacotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>Pacote #{item.id} - {item.destino_cidade}</Text>
              <Text style={styles.detalhe}>Cliente: {item.cliente_nome}</Text>
              <Text style={styles.detalhe}>Período: {item.data_ida} até {item.data_volta}</Text>
              <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)} ({item.status})</Text>
            </View>
            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => editar(item)} style={styles.botaoAcao}>
                <Text style={styles.textoEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluir(item.id)} style={styles.botaoAcao}>
                <Text style={styles.textoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  botaoSalvar: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  detalhe: { fontSize: 13, color: '#666', marginTop: 2 },
  preco: { fontSize: 14, fontWeight: 'bold', color: '#0066cc', marginTop: 4 },
  acoes: { flexDirection: 'row', gap: 8 },
  botaoAcao: { padding: 6 },
  textoEditar: { color: '#0066cc', fontWeight: '600' },
  textoExcluir: { color: '#cc0000', fontWeight: '600' },
});
