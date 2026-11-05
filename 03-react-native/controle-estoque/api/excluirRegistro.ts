import { avisar, confirmar } from './avisos';

export async function excluirRegistro(
  url: string,
  id: number,
  mensagemConfirmacao: string
): Promise<boolean> {
  const confirmado = await confirmar('Confirmar Exclusão', mensagemConfirmacao);
  if (!confirmado) {
    return false;
  }

  try {
    const resposta = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    avisar('Removido!', 'O registro foi removido do Banco de Dados MySQL.');
    return true;
  } catch {
    avisar('Erro', 'Ocorreu um erro ao excluir o registro.');
    return false;
  }
}
