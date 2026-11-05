import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Filial {
  cnpj: string;
  nome: string;
  telefone: string;
  endereco: string;
}

const API_URL = 'http://localhost:3002/filiais';

export default function TelaFiliais() {
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [cnpj, setCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const carregar = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setFiliais(dados);
    } catch {
      Alert.alert('Erro', 'Falha ao buscar filiais');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const cadastrar = async () => {
    if (!cnpj.trim() || !nome.trim() || !telefone.trim() || !endereco.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos da filial!');
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj, nome, telefone, endereco }),
      });

      setCnpj('');
      setNome('');
      setTelefone('');
      setEndereco('');
      carregar();
    } catch {
      Alert.alert('Erro', 'Falha ao cadastrar filial');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Filiais</Text>

      <TextInput
        style={styles.input}
        placeholder="CNPJ (ex: 12.345.678/0001-90)"
        value={cnpj}
        onChangeText={setCnpj}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da Filial"
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
        placeholder="Endereço da Filial"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar Filial</Text>
      </TouchableOpacity>

      <FlatList
        data={filiais}
        keyExtractor={(item) => item.cnpj}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.detalhe}>CNPJ: {item.cnpj}</Text>
            <Text style={styles.detalhe}>Tel: {item.telefone} • {item.endereco}</Text>
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
    borderLeftColor: '#f59e0b',
    elevation: 2,
  },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  detalhe: { fontSize: 13, color: '#475569', marginTop: 2 },
});
