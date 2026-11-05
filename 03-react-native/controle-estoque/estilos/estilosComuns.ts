import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 10
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  lista: {
    flex: 1,
    width: '100%'
  },
  conteudoLista: {
    paddingBottom: 24
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16
  },
  formulario: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee'
  },
  formularioEdicao: {
    borderColor: '#ed6c02',
    backgroundColor: '#fffbf7'
  },
  formularioTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8
  },
  rotulo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  entradaTexto: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    marginBottom: 8
  },
  fileiraCampos: {
    flexDirection: 'row'
  },
  fileiraAcoes: {
    flexDirection: 'row',
    marginTop: 4
  },
  botao: {
    flex: 2,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center'
  },
  botaoVerde: {
    backgroundColor: '#2e7d32'
  },
  botaoLaranja: {
    backgroundColor: '#ed6c02'
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#777',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 8
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    backgroundColor: '#f9f9f9'
  },
  chipAtivo: {
    backgroundColor: '#1565c0',
    borderColor: '#1565c0'
  },
  chipTexto: {
    fontSize: 13,
    color: '#333'
  },
  chipTextoAtivo: {
    color: '#fff',
    fontWeight: 'bold'
  },
  cartao: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1
  },
  cabecalhoCartao: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  detalhes: {
    flex: 1,
    minWidth: 0,
    marginRight: 8
  },
  cartaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1
  },
  cartaoSubtitulo: {
    fontSize: 13,
    color: '#666',
    flexShrink: 1
  },
  botaoDeletar: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4
  },
  botaoDeletarTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  fileiraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6
  },
  textoVerde: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32'
  },
  textoLaranja: {
    fontSize: 13,
    color: '#ed6c02'
  },
  dicaEdicao: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
    fontStyle: 'italic'
  }
});
