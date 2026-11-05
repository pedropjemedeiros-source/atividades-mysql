import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

interface ItemEstoque {
  id_produto: number;
  produto_nome: string;
  cnpj_filial: string;
  filial_nome: string;
  preco: number | string;
  quantidade: number;
  validade: string;
}

const API_URL = 'http://localhost:3002/estoque';

export default function TelaEstoque() {
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);
  const [idProduto, setIdProduto] = useState('');
  const [cnpjFilial, setCnpjFilial] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [validade, setValidade] = useState('');
  const [editando, setEditando] = useState(false);

  const carregar = async () => {
    try {
      const resp = await fetch(API_URL);
      const dados = await resp.json();
      setEstoque(dados);
    } catch {
      Alert.alert('Erro', 'Falha ao buscar estoque');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (!idProduto.trim() || !cnpjFilial.trim() || !preco.trim() || !quantidade.trim() || !validade.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do estoque!');
      return;
    }

    try {
      const cnpjCodificado = encodeURIComponent(cnpjFilial.trim());
      const url = editando ? `${API_URL}/${idProduto}/${cnpjCodificado}` : API_URL;
      const metodo = editando ? 'PUT' : 'POST';

      await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_produto: Number(idProduto),
          cnpj_filial: cnpjFilial.trim(),
          preco: parseFloat(preco.replace(',', '.')),
          quantidade: parseInt(quantidade, 10),
          validade: validade.trim(),
        }),
      });

      setIdProduto('');
      setCnpjFilial('');
      setPreco('');
      setQuantidade('');
      setValidade('');
      setEditando(false);
      carregar();
    } catch {
      Alert.alert('Erro', 'Falha ao salvar item de estoque');
    }
  };

  const editar = (item: ItemEstoque) => {
    setEditando(true);
    setIdProduto(item.id_produto.toString());
    setCnpjFilial(item.cnpj_filial);
    setPreco(item.preco.toString());
    setQuantidade(item.quantidade.toString());
    setValidade(item.validade);
  };

  const excluir = async (id_produto: number, cnpj_filial: string) => {
    try {
      const cnpjCodificado = encodeURIComponent(cnpj_filial);
      await fetch(`${API_URL}/${id_produto}/${cnpjCodificado}`, { method: 'DELETE' });
      carregar();
    } catch {
      Alert.alert('Erro', 'Falha ao excluir registro de estoque');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Estoque por Filial</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="ID Produto"
          value={idProduto}
          onChangeText={setIdProduto}
          keyboardType="numeric"
          editable={!editando}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CNPJ Filial"
          value={cnpjFilial}
          onChangeText={setCnpjFilial}
          editable={!editando}
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
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Validade (AAAA-MM-DD)"
        value={validade}
        onChangeText={setValidade}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>{editando ? 'Atualizar Estoque' : 'Vincular ao Estoque'}</Text>
      </TouchableOpacity>

      <FlatList
        data={estoque}
        keyExtractor={(item) => `${item.id_produto}_${item.cnpj_filial}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.produto_nome}</Text>
              <Text style={styles.detalhe}>Filial: {item.filial_nome}</Text>
              <Text style={styles.detalhe}>Qtd: {item.quantidade} un. • Validade: {item.validade}</Text>
              <Text style={styles.preco}>R$ {Number(item.preco).toFixed(2)}</Text>
            </View>
            <View style={styles.acoes}>
              <TouchableOpacity onPress={() => editar(item)} style={styles.botaoAcao}>
                <Text style={styles.textoEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluir(item.id_produto, item.cnpj_filial)} style={styles.botaoAcao}>
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
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  detalhe: { fontSize: 13, color: '#475569', marginTop: 2 },
  preco: { fontSize: 14, fontWeight: 'bold', color: '#10b981', marginTop: 4 },
  acoes: { flexDirection: 'row', gap: 8 },
  botaoAcao: { padding: 6 },
  textoEditar: { color: '#2563eb', fontWeight: '600' },
  textoExcluir: { color: '#ef4444', fontWeight: '600' },
});
