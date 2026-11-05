-- ========================================================
-- TÓPICO 06: FORNECEDOR - RESTRIÇÕES, INSERT, SELECT
-- Repositório: wdiasmaciel/01-banco-de-dados-mysql
-- ========================================================

DROP DATABASE IF EXISTS empresa;
CREATE DATABASE empresa;
USE empresa;

-- --------------------------------------------------------
-- Estrutura da Tabela Fornecedor
-- --------------------------------------------------------
DROP TABLE IF EXISTS Fornecedor;

CREATE TABLE Fornecedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(256) NOT NULL UNIQUE,
    telefone VARCHAR(20) NULL UNIQUE,
    endereco VARCHAR(255) NOT NULL
);

-- Inserções base para teste inicial
INSERT INTO Fornecedor (nome, telefone, endereco) VALUES
('Tech Distribuidora', '(11) 98888-1111', 'Rua Augusta, 100 - São Paulo, SP'),
('Papelaria Central', '(21) 97777-2222', 'Av. Rio Branco, 250 - Rio de Janeiro, RJ'),
('Móveis Design', '(31) 96666-3333', 'Rua da Bahia, 50 - Belo Horizonte, MG'),
('Química Industrial', '(41) 95555-4444', 'Av. Batel, 800 - Curitiba, PR'),
('Logística Express', '(51) 94444-5555', 'Rua dos Andradas, 300 - Porto Alegre, RS');

-- ========================================================
-- EXERCÍCIOS RESOLVIDOS
-- ========================================================

-- --------------------------------------------------------
-- Exercício 1 (Inserção e Restrições):
-- Inserir 'Suprimentos Globais', '(11) 91111-2222', 'Av. das Nações, 500 - São Paulo, SP'
-- Resposta à pergunta:
-- O que acontecerá se você tentar executar esse mesmo comando uma segunda vez? Por quê?
-- RESPOSTA: Ocorrerá um erro de violação de chave única (ERROR 1062 - Duplicate entry 'Suprimentos Globais' for key 'nome').
-- Isso ocorre porque as colunas `nome` e `telefone` possuem a restrição UNIQUE, impedindo registros duplicados.
-- --------------------------------------------------------
INSERT INTO Fornecedor (nome, telefone, endereco)
VALUES ('Suprimentos Globais', '(11) 91111-2222', 'Av. das Nações, 500 - São Paulo, SP');

-- --------------------------------------------------------
-- Exercício 2 (Filtro por Intervalo):
-- Retornar apenas fornecedores com id entre 3 e 5 (inclusive) usando BETWEEN.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE id BETWEEN 3 AND 5;

-- --------------------------------------------------------
-- Exercício 3 (Seleção de Valores Específicos):
-- Apresentar fornecedores com IDs 1, 2 ou 4 sem usar o operador OR.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE id IN (1, 2, 4);

-- --------------------------------------------------------
-- Exercício 4 (Ordenação por Posição):
-- Retornar todas as colunas ordenadas de forma decrescente pelo nome, referenciando a posição numérica (coluna 2).
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
ORDER BY 2 DESC;

-- --------------------------------------------------------
-- Exercício 5 (Ordenação Oculta):
-- Exibir apenas 'nome' e 'endereco' ordenados por id DESC (sem incluir id no SELECT).
-- --------------------------------------------------------
SELECT nome, endereco 
FROM Fornecedor 
ORDER BY id DESC;

-- --------------------------------------------------------
-- Exercício 6 (Inserção Padrão):
-- Cadastrar: Nome: Paraná Madeiras, Telefone: (41) 3322-1111, Endereço: Rua Chile, 1500 - Curitiba, PR.
-- --------------------------------------------------------
INSERT INTO Fornecedor (nome, telefone, endereco) 
VALUES ('Paraná Madeiras', '(41) 3322-1111', 'Rua Chile, 1500 - Curitiba, PR');

-- --------------------------------------------------------
-- Exercício 7 (Inserção Múltipla):
-- Um único comando INSERT para cadastrar os 3 fornecedores solicitados.
-- --------------------------------------------------------
INSERT INTO Fornecedor (nome, telefone, endereco) VALUES
('Alimentos Nordeste', '(81) 9988-7766', 'Av. Boa Viagem, 400 - Recife, PE'),
('Metais Sudeste', '(11) 2233-4455', 'Rua das Indústrias, 80 - Osasco, SP'),
('Vidros do Sul', '(51) 3211-0000', 'Av. Farrapos, 1010 - Porto Alegre, RS');

-- --------------------------------------------------------
-- Exercício 8 (Inserção Condicional/Nulos):
-- Cadastrar 'Artesanatos da Bahia' com telefone NULL.
-- --------------------------------------------------------
INSERT INTO Fornecedor (nome, telefone, endereco) 
VALUES ('Artesanatos da Bahia', NULL, 'Rua do Passo, 12 - Salvador, BA');

-- --------------------------------------------------------
-- Exercício 9 (Seleção Simples):
-- Retornar apenas 'nome' e 'telefone' de todos os fornecedores.
-- --------------------------------------------------------
SELECT nome, telefone 
FROM Fornecedor;

-- --------------------------------------------------------
-- Exercício 10 (Filtro de Texto Exato):
-- Retornar todas as colunas do fornecedor cujo nome seja 'Metais Sudeste'.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE nome = 'Metais Sudeste';

-- --------------------------------------------------------
-- Exercício 11 (Filtro de Texto Parcial - LIKE):
-- Listar fornecedores com endereço no estado de SP.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE endereco LIKE '%SP%';

-- --------------------------------------------------------
-- Exercício 12 (Filtro por ID):
-- Informações completas do fornecedor de id = 3.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE id = 3;

-- --------------------------------------------------------
-- Exercício 13 (Operadores de Comparação):
-- Fornecedores com id maior ou igual a 4.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE id >= 4;

-- --------------------------------------------------------
-- Exercício 14 (Ordenação Ascendente):
-- Nome e endereço em ordem alfabética (A-Z) pelo nome.
-- --------------------------------------------------------
SELECT nome, endereco 
FROM Fornecedor 
ORDER BY nome ASC;

-- --------------------------------------------------------
-- Exercício 15 (Filtro Composto e Ordenação):
-- Fornecedores com id entre 2 e 5, ordenados do maior ID para o menor.
-- --------------------------------------------------------
SELECT * 
FROM Fornecedor 
WHERE id BETWEEN 2 AND 5 
ORDER BY id DESC;
