import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Fornecedor {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
}

const API_URL = 'http://localhost:3002/fornecedores';

export default function TelaFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const carregar = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setFornecedores(dados);
    } catch {
      Alert.alert('Erro', 'Falha ao buscar fornecedores');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const cadastrar = async () => {
    if (!nome.trim() || !telefone.trim() || !endereco.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do fornecedor!');
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, endereco }),
      });

      setNome('');
      setTelefone('');
      setEndereco('');
      carregar();
    } catch {
      Alert.alert('Erro', 'Falha ao cadastrar fornecedor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Fornecedores</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar Fornecedor</Text>
      </TouchableOpacity>

      <FlatList
        data={fornecedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>#{item.id} - {item.nome}</Text>
            <Text style={styles.detalhe}>Tel: {item.telefone}</Text>
            <Text style={styles.detalhe}>{item.endereco}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1e293b' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
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
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    elevation: 2,
  },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  detalhe: { fontSize: 13, color: '#475569', marginTop: 2 },
});
