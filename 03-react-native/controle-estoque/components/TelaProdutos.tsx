import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Produto {
  id: number;
  nome: string;
  id_fornecedor: number;
  fornecedor_nome: string;
  identificacao_descricao?: string;
  identificacao_observacao?: string;
}

const API_URL = 'http://localhost:3002/produtos';

export default function TelaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');

  const carregar = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setProdutos(dados);
    } catch {
      Alert.alert('Erro', 'Falha ao buscar produtos');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const cadastrar = async () => {
    if (!nome.trim() || !idFornecedor.trim()) {
      Alert.alert('Atenção', 'Nome do produto e ID do fornecedor são obrigatórios!');
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          id_fornecedor: Number(idFornecedor),
          descricao: descricao.trim() || null,
          observacao: observacao.trim() || null,
        }),
      });

      setNome('');
      setIdFornecedor('');
      setDescricao('');
      setObservacao('');
      carregar();
    } catch {
      Alert.alert('Erro', 'Falha ao cadastrar produto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos & Identificação</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Fornecedor"
        value={idFornecedor}
        onChangeText={setIdFornecedor}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da Identificação (ex: Especificações técnicas)"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Observação da Identificação"
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>#{item.id} - {item.nome}</Text>
            <Text style={styles.detalhe}>Fornecedor: {item.fornecedor_nome} (ID {item.id_fornecedor})</Text>
            {item.identificacao_descricao && (
              <Text style={styles.detalhe}>Identificação: {item.identificacao_descricao}</Text>
            )}
            {item.identificacao_observacao && (
              <Text style={styles.obs}>Obs: {item.identificacao_observacao}</Text>
            )}
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
    borderLeftColor: '#10b981',
    elevation: 2,
  },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  detalhe: { fontSize: 13, color: '#475569', marginTop: 2 },
  obs: { fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginTop: 2 },
});
