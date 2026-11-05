import { avisar } from './avisos';

export async function salvarRegistro(
  url: string,
  id: number | undefined,
  dados: object
): Promise<boolean> {
  const urlFinal = id === undefined ? url : `${url}/${id}`;
  const metodoHttp = id === undefined ? 'POST' : 'PUT';

  try {
    const resposta = await fetch(urlFinal, {
      method: metodoHttp,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const corpo = await resposta.json();

    if (!resposta.ok) {
      avisar('Erro', corpo.msg_erro ?? `Erro HTTP ${resposta.status}`);
      return false;
    }

    avisar(
      'Sucesso!',
      id === undefined ? 'Registro cadastrado no MySQL!' : 'Registro atualizado no MySQL!'
    );
    return true;
  } catch (erro) {
    console.error('Erro ao processar requisição no servidor:', erro);
    avisar('Erro', 'Não foi possível conectar à API.');
    return false;
  }
}
