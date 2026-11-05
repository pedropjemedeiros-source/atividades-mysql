import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TelaClientes from './components/TelaClientes';
import TelaDestinos from './components/TelaDestinos';
import TelaPacotes from './components/TelaPacotes';

type Aba = 'clientes' | 'destinos' | 'pacotes';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('pacotes');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>✈️ Agência de Viagens</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'clientes' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('clientes')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'clientes' && styles.textoAtivo]}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'destinos' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('destinos')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'destinos' && styles.textoAtivo]}>Destinos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoMenu, abaAtiva === 'pacotes' && styles.botaoAtivo]}
          onPress={() => setAbaAtiva('pacotes')}
        >
          <Text style={[styles.textoMenu, abaAtiva === 'pacotes' && styles.textoAtivo]}>Pacotes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        {abaAtiva === 'clientes' && <TelaClientes />}
        {abaAtiva === 'destinos' && <TelaDestinos />}
        {abaAtiva === 'pacotes' && <TelaPacotes />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#0066cc',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  botaoMenu: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoAtivo: {
    borderBottomWidth: 3,
    borderBottomColor: '#0066cc',
  },
  textoMenu: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
  },
  textoAtivo: {
    color: '#0066cc',
  },
  conteudo: {
    flex: 1,
  },
});
