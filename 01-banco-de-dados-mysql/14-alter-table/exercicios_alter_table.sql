-- ========================================================
-- TÓPICO 14: ALTER TABLE EM MYSQL
-- Repositório: wdiasmaciel/01-banco-de-dados-mysql
-- ========================================================

DROP DATABASE IF EXISTS sistema_geral;
CREATE DATABASE sistema_geral;
USE sistema_geral;

-- --------------------------------------------------------
-- Preparação das Tabelas Base
-- --------------------------------------------------------
CREATE TABLE Padaria_Pao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    valor_venda DECIMAL(10, 2) NOT NULL,
    codigo_interno VARCHAR(20)
);

CREATE TABLE Farmacia_Medicamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    principio_ativo VARCHAR(100),
    estoque INT DEFAULT 0,
    codigo_barras VARCHAR(50)
);

CREATE TABLE Medicamento_Venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_medicamento INT,
    quantidade INT,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Viagem (
    codigo_pacote INT,
    data_saida DATE,
    agencia_nome VARCHAR(100),
    destino VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE Cliente_Viagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

-- ========================================================
-- EXERCÍCIOS RESOLVIDOS (1 a 20)
-- ========================================================

-- 1. Em uma tabela chamada Padaria_Pao, adicione uma coluna data_fabricacao do tipo DATE que não permita valor nulo.
ALTER TABLE Padaria_Pao 
ADD COLUMN data_fabricacao DATE NOT NULL;

-- 2. Na mesma tabela, adicione uma coluna opcional observacao, com tamanho máximo de 200 caracteres.
ALTER TABLE Padaria_Pao 
ADD COLUMN observacao VARCHAR(200) NULL;

-- 3. Altere o tamanho da coluna nome para permitir 120 caracteres.
ALTER TABLE Padaria_Pao 
MODIFY COLUMN nome VARCHAR(120) NOT NULL;

-- 4. Renomeie a coluna valor_venda para preco sem alterar seu tipo.
ALTER TABLE Padaria_Pao 
RENAME COLUMN valor_venda TO preco;

-- 5. Adicione a coluna peso_gramas logo após a coluna nome.
ALTER TABLE Padaria_Pao 
ADD COLUMN peso_gramas DECIMAL(8, 2) AFTER nome;

-- 6. Na tabela da padaria, altere o preço padrão do produto para o valor 0,00.
ALTER TABLE Padaria_Pao 
ALTER COLUMN preco SET DEFAULT 0.00;

-- 7. Remova o valor padrão da coluna peso_gramas.
ALTER TABLE Padaria_Pao 
ALTER COLUMN peso_gramas DROP DEFAULT;

-- 8. Remova da tabela de padaria uma coluna chamada codigo_interno que não é mais utilizada.
ALTER TABLE Padaria_Pao 
DROP COLUMN codigo_interno;

-- 9. Na tabela Farmacia_Medicamento, torne a coluna principio_ativo obrigatória.
ALTER TABLE Farmacia_Medicamento 
MODIFY COLUMN principio_ativo VARCHAR(100) NOT NULL;

-- 10. Adicione à tabela de medicamentos uma restrição que impeça o estoque de receber valores negativos.
ALTER TABLE Farmacia_Medicamento 
ADD CONSTRAINT chk_estoque_positivo CHECK (estoque >= 0);

-- 11. Crie uma restrição única para impedir medicamentos com o mesmo código de barras.
ALTER TABLE Farmacia_Medicamento 
ADD CONSTRAINT uk_codigo_barras UNIQUE (codigo_barras);

-- 12. Remova da tabela de medicamentos a restrição única criada no exercício anterior.
ALTER TABLE Farmacia_Medicamento 
DROP INDEX uk_codigo_barras;

-- 13. Adicione à tabela Medicamento_Venda uma chave estrangeira relacionando o medicamento ao respectivo registro da tabela Farmacia_Medicamento.
ALTER TABLE Medicamento_Venda 
ADD CONSTRAINT fk_venda_medicamento 
FOREIGN KEY (id_medicamento) REFERENCES Farmacia_Medicamento(id);

-- 14. Remova essa chave estrangeira sem remover a coluna que contém o identificador do medicamento.
ALTER TABLE Medicamento_Venda 
DROP FOREIGN KEY fk_venda_medicamento;

-- 15. Crie um índice para acelerar consultas pelo nome da agência de viagens.
CREATE INDEX idx_agencia_nome ON Viagem (agencia_nome);

-- 16. Adicione uma chave primária à tabela Viagem formada pelas colunas codigo_pacote e data_saida.
ALTER TABLE Viagem 
ADD PRIMARY KEY (codigo_pacote, data_saida);

-- 17. Remova temporariamente a chave primária da tabela Viagem e explique por que essa operação pode ser perigosa.
ALTER TABLE Viagem 
DROP PRIMARY KEY;
-- EXPLICAÇÃO: Remover a Primary Key remove a garantia de unicidade de linhas na tabela, permitindo duplicações acidentais e quebrando possíveis chaves estrangeiras dependentes.

-- 18. Renomeie a tabela Cliente_Viagem para Turista.
ALTER TABLE Cliente_Viagem 
RENAME TO Turista;

-- 19. Adicione simultaneamente uma coluna ativo e um índice pelo campo destino na tabela de pacotes turísticos.
ALTER TABLE Viagem 
ADD COLUMN ativo TINYINT(1) DEFAULT 1,
ADD INDEX idx_viagem_destino (destino);

-- 20. Escreva uma sequência de alterações que aumente o tamanho de um campo de e-mail, renomeie esse campo para email_contato e adicione uma restrição única.
ALTER TABLE Viagem MODIFY COLUMN email VARCHAR(150);
ALTER TABLE Viagem RENAME COLUMN email TO email_contato;
ALTER TABLE Viagem ADD CONSTRAINT uk_viagem_email UNIQUE (email_contato);
