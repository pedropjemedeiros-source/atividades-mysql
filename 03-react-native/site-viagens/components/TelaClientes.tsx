import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

const API_URL = 'http://localhost:3001/clientes';

export default function TelaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const carregarClientes = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setClientes(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os clientes');
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const salvar = async () => {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const metodo = idEdicao ? 'PUT' : 'POST';
      const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;

      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone }),
      });

      setNome('');
      setEmail('');
      setTelefone('');
      setIdEdicao(null);
      carregarClientes();
    } catch {
      Alert.alert('Erro', 'Falha ao salvar cliente');
    }
  };

  const editar = (item: Cliente) => {
    setIdEdicao(item.id);
    setNome(item.nome);
    setEmail(item.email);
    setTelefone(item.telefone);
  };

  const excluir = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      carregarClientes();
    } catch {
      Alert.alert('Erro', 'Falha ao excluir cliente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Clientes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do cliente"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone (ex: (11) 98888-7777)"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>{idEdicao ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</Text>
      </TouchableOpacity>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhe}>{item.email} • {item.telefone}</Text>
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
  acoes: { flexDirection: 'row', gap: 8 },
  botaoAcao: { padding: 6 },
  textoEditar: { color: '#0066cc', fontWeight: '600' },
  textoExcluir: { color: '#cc0000', fontWeight: '600' },
});
