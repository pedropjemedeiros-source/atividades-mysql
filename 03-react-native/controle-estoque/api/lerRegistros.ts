export async function lerRegistros<T>(url: string): Promise<T[]> {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao buscar registros no banco de dados:', erro);
    return [];
  }
}
