import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TelaFornecedores from './components/TelaFornecedores';
import TelaProdutos from './components/TelaProdutos';
import TelaFiliais from './components/TelaFiliais';
import TelaEstoque from './components/TelaEstoque';

type Aba = 'fornecedores' | 'produtos' | 'filiais' | 'estoque';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('estoque');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>📦 Controle de Estoque nas Filiais</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'fornecedores' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('fornecedores')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'fornecedores' && styles.textoAtivo]}>Fornecedores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'produtos' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('produtos')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'produtos' && styles.textoAtivo]}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'filiais' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('filiais')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'filiais' && styles.textoAtivo]}>Filiais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'estoque' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('estoque')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'estoque' && styles.textoAtivo]}>Estoque</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        {abaAtiva === 'fornecedores' && <TelaFornecedores />}
        {abaAtiva === 'produtos' && <TelaProdutos />}
        {abaAtiva === 'filiais' && <TelaFiliais />}
        {abaAtiva === 'estoque' && <TelaEstoque />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { padding: 16, backgroundColor: '#1e293b', alignItems: 'center' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  menu: { flexDirection: 'row', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  botaoMenu: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  botaoAtivo: { borderBottomWidth: 3, borderBottomColor: '#2563eb' },
  textoMenu: { fontSize: 12, fontWeight: '600', color: '#64748b' },
  textoAtivo: { color: '#2563eb' },
  conteudo: { flex: 1 },
});
