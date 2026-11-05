-- ========================================================
-- BANCO DE DADOS: CONTROLE DE ESTOQUE NAS FILIAIS
-- Exercício 4 do repositório 02-node-mysql-react-native
-- ========================================================

DROP DATABASE IF EXISTS controle_estoque_db;
CREATE DATABASE controle_estoque_db;
USE controle_estoque_db;

-- 1. TABELA FORNECEDOR
CREATE TABLE Fornecedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

-- 2. TABELA PRODUTO
CREATE TABLE Produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_fornecedor INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES Fornecedor(id) ON DELETE CASCADE
);

-- 3. TABELA IDENTIFICAÇÃO (Relação 1:1 com Produto)
CREATE TABLE Identificacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    observacao VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES Produto(id) ON DELETE CASCADE
);

-- 4. TABELA FILIAL
CREATE TABLE Filial (
    cnpj VARCHAR(18) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

-- 5. TABELA ESTOQUE (Entidade-Relacionamento N:N entre Produto e Filial)
CREATE TABLE Estoque (
    id_produto INT NOT NULL,
    cnpj_filial VARCHAR(18) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    validade DATE NOT NULL,
    PRIMARY KEY (id_produto, cnpj_filial),
    FOREIGN KEY (id_produto) REFERENCES Produto(id) ON DELETE CASCADE,
    FOREIGN KEY (cnpj_filial) REFERENCES Filial(cnpj) ON DELETE CASCADE
);

-- DADOS INICIAIS DE TESTE
INSERT INTO Fornecedor (nome, telefone, endereco) VALUES
('Tech Parts Brasil', '(11) 3222-1111', 'Av. Paulista, 1000 - São Paulo, SP'),
('Log Componentes', '(41) 3333-2222', 'Rua das Flores, 50 - Curitiba, PR');

INSERT INTO Produto (id_fornecedor, nome) VALUES
(1, 'Monitor LED 27 polegadas'),
(1, 'Teclado Mecânico RGB'),
(2, 'Gabinete Torre Gamer');

INSERT INTO Identificacao (id_produto, descricao, observacao) VALUES
(1, 'Monitor IPS 144Hz com ajuste de altura', 'Garantia de 3 anos pelo fabricante'),
(2, 'Switches mecânicos azuis com layout ABNT2', 'Resistente a respingos'),
(3, 'Vidro temperado lateral com 4 coolers inclusos', 'Suporta radiadores de até 360mm');

INSERT INTO Filial (cnpj, nome, telefone, endereco) VALUES
('12.345.678/0001-90', 'Filial Matriz São Paulo', '(11) 3100-0001', 'Av. Brigadeiro Faria Lima, 200 - São Paulo, SP'),
('12.345.678/0002-71', 'Filial Sul Curitiba', '(41) 3200-0002', 'Rua Marechal Deodoro, 400 - Curitiba, PR');

INSERT INTO Estoque (id_produto, cnpj_filial, preco, quantidade, validade) VALUES
(1, '12.345.678/0001-90', 1299.90, 25, '2028-12-31'),
(1, '12.345.678/0002-71', 1349.90, 10, '2028-12-31'),
(2, '12.345.678/0001-90', 279.90, 40, '2029-06-30'),
(3, '12.345.678/0002-71', 450.00, 15, '2029-12-31');
