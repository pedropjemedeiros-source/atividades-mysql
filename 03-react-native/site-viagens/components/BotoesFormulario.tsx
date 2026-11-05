import { Text, TouchableOpacity, View } from 'react-native';
import { estilos } from '../estilos/estilosComuns';

interface Propriedades {
  editando: boolean;
  aoSalvar: () => void;
  aoCancelar: () => void;
}

export default function BotoesFormulario(props: Propriedades) {
  return (
    <View style={estilos.fileiraAcoes}>
      <TouchableOpacity
        style={[estilos.botao, props.editando ? estilos.botaoLaranja : estilos.botaoVerde]}
        onPress={props.aoSalvar}
      >
        <Text style={estilos.botaoTexto}>
          {props.editando ? 'Atualizar no MySQL' : 'Salvar no MySQL'}
        </Text>
      </TouchableOpacity>

      {props.editando && (
        <TouchableOpacity style={estilos.botaoCancelar} onPress={props.aoCancelar}>
          <Text style={estilos.botaoTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
