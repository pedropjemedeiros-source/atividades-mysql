import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface Destino {
  id: number;
  cidade: string;
  estado: string;
  pais: string;
  descricao: string;
}

const API_URL = 'http://localhost:3001/destinos';

export default function TelaDestinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('Brasil');
  const [descricao, setDescricao] = useState('');
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const carregarDestinos = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setDestinos(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os destinos');
    }
  };

  useEffect(() => {
    carregarDestinos();
  }, []);

  const salvar = async () => {
    if (!cidade.trim() || !estado.trim()) {
      Alert.alert('Atenção', 'Cidade e Estado são obrigatórios!');
      return;
    }

    try {
      const metodo = idEdicao ? 'PUT' : 'POST';
      const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;

      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cidade, estado, pais, descricao }),
      });

      setCidade('');
      setEstado('');
      setPais('Brasil');
      setDescricao('');
      setIdEdicao(null);
      carregarDestinos();
    } catch {
      Alert.alert('Erro', 'Falha ao salvar destino');
    }
  };

  const editar = (item: Destino) => {
    setIdEdicao(item.id);
    setCidade(item.cidade);
    setEstado(item.estado);
    setPais(item.pais);
    setDescricao(item.descricao || '');
  };

  const excluir = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      carregarDestinos();
    } catch {
      Alert.alert('Erro', 'Falha ao excluir destino');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Destinos Turísticos</Text>

      <TextInput
        style={styles.input}
        placeholder="Cidade (ex: Gramado)"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado / Sigla (ex: RS)"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="País (padrão: Brasil)"
        value={pais}
        onChangeText={setPais}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do destino"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>{idEdicao ? 'Atualizar Destino' : 'Cadastrar Destino'}</Text>
      </TouchableOpacity>

      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.cidade} - {item.estado} ({item.pais})</Text>
              <Text style={styles.detalhe}>{item.descricao}</Text>
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
