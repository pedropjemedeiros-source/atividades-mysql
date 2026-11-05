-- ========================================================
-- BANCO DE DADOS: SITE DE VIAGENS
-- Exercício 3 do repositório 02-node-mysql-react-native
-- ========================================================

DROP DATABASE IF EXISTS site_viagens_db;
CREATE DATABASE site_viagens_db;
USE site_viagens_db;

-- 1. TABELA CLIENTE
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

-- 2. TABELA DESTINO TURÍSTICO
CREATE TABLE destino_turistico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    pais VARCHAR(50) NOT NULL DEFAULT 'Brasil',
    descricao TEXT
);

-- 3. TABELA PACOTE DE VIAGEM
CREATE TABLE pacote_viagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_destino INT NOT NULL,
    data_ida DATE NOT NULL,
    data_volta DATE NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'confirmado',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (id_destino) REFERENCES destino_turistico(id) ON DELETE CASCADE
);

-- DADOS DE TESTE INICIAIS
INSERT INTO cliente (nome, email, telefone) VALUES
('Mariana Lima', 'mariana.lima@email.com', '(11) 98888-2222'),
('Rodrigo Santos', 'rodrigo.santos@email.com', '(21) 97777-3333'),
('Camila Duarte', 'camila.duarte@email.com', '(31) 96666-4444');

INSERT INTO destino_turistico (cidade, estado, pais, descricao) VALUES
('Natal', 'RN', 'Brasil', 'Praias de águas mornas e dunas exuberantes'),
('Gramado', 'RS', 'Brasil', 'Clima de serra, gastronomia e chocolates'),
('Foz do Iguaçu', 'PR', 'Brasil', 'Cataratas do Iguaçu e compras na fronteira');

INSERT INTO pacote_viagem (id_cliente, id_destino, data_ida, data_volta, preco, status) VALUES
(1, 1, '2027-01-10', '2027-01-17', 2499.90, 'confirmado'),
(2, 2, '2027-06-15', '2027-06-22', 1890.00, 'confirmado'),
(3, 3, '2027-09-05', '2027-09-10', 1450.50, 'pendente');
