-- ========================================================
-- TÓPICO 07: UPDATE EM TABELAS MYSQL
-- Repositório: wdiasmaciel/01-banco-de-dados-mysql
-- ========================================================

CREATE DATABASE IF NOT EXISTS empresa;
USE empresa;

-- ========================================================
-- Exercício 1 — Continuação do projeto: Produto
-- ========================================================

DROP TABLE IF EXISTS Produto;

CREATE TABLE Produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(256) NOT NULL,
    cnpj_fornecedor VARCHAR(18) NOT NULL
);

INSERT INTO Produto (nome, cnpj_fornecedor) VALUES
('arroz tipo 1 5kg', '11111111000101'),
('Feijão Preto 1kg', '11111111000101'),
('Açúcar Refinado 1kg', '22222222000102'),
('Café Torrado 500g', '22222222000102'),
('Cabo usb-c 1m', '33333333000103'),
('Adaptador usb-c para HDMI', '33333333000103'),
('Hub usb-c 4 portas', '44444444000104');

-- Tarefa 1.a: Corrigir o nome do produto id = 1 para 'Arroz Tipo 1 5kg'
UPDATE Produto 
SET nome = 'Arroz Tipo 1 5kg' 
WHERE id = 1;

-- Tarefa 1.b (7-b): Usando LIKE, adicionar o prefixo '[Eletrônico] ' aos produtos com "usb-c"
UPDATE Produto 
SET nome = CONCAT('[Eletrônico] ', nome) 
WHERE LOWER(nome) LIKE '%usb-c%';

-- Tarefa 1.c (7-c): Usando IN, transferir produtos 6 e 7 para o fornecedor '11111111000101'
UPDATE Produto 
SET cnpj_fornecedor = '11111111000101' 
WHERE id IN (6, 7);

-- Tarefa 1.d: Usando CASE WHEN, concatenar [Produto X] nos IDs 2, 3 e 4
UPDATE Produto 
SET nome = CASE id 
    WHEN 2 THEN CONCAT(nome, ' [Produto 2]')
    WHEN 3 THEN CONCAT(nome, ' [Produto 3]')
    WHEN 4 THEN CONCAT(nome, ' [Produto 4]')
    ELSE nome 
END 
WHERE id IN (2, 3, 4);

-- Tarefa 1.e: Explicação de segurança
-- RESPOSTA: Executar um UPDATE no campo `cnpj_fornecedor` sem WHERE alteraria TODOS os produtos da empresa
-- para pertencerem a um único fornecedor, corrompendo a integridade referencial dos dados comerciais.


-- ========================================================
-- Exercício 2 — Padaria: tabela Pedido
-- ========================================================

DROP TABLE IF EXISTS Pedido;

CREATE TABLE Pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    quantidade INT NOT NULL,
    observacao VARCHAR(255) NULL
);

INSERT INTO Pedido (cliente, status, quantidade, observacao) VALUES
('Ana Souza', 'pendente', 5, NULL),
('Carlos Lima', 'preparando', 12, 'entregar na portaria'),
('Mariana Rios', 'preparando', 3, NULL),
('Ana Souza', 'pendente', 15, NULL),
('Beatriz Mendes', 'pronto', 8, 'embalagem para presente');

-- Tarefa 2.a: Pedido id = 3 ficou pronto
UPDATE Pedido 
SET status = 'pronto' 
WHERE id = 3;

-- Tarefa 2.b: Pedidos pendentes da 'Ana Souza' com observação de retirada
UPDATE Pedido 
SET observacao = 'cliente vai retirar às 18h' 
WHERE cliente = 'Ana Souza' AND status = 'pendente';

-- Tarefa 2.c: Avançar status com CASE WHEN (preparando -> pronto; pronto -> entregue)
UPDATE Pedido 
SET status = CASE status 
    WHEN 'preparando' THEN 'pronto'
    WHEN 'pronto' THEN 'entregue'
    ELSE status 
END 
WHERE status IN ('preparando', 'pronto');

-- Tarefa 2.d: Adicionar ' - pedido grande' aos pedidos com quantidade > 10
UPDATE Pedido 
SET observacao = CONCAT(COALESCE(observacao, ''), ' - pedido grande') 
WHERE quantidade > 10;


-- ========================================================
-- Exercício 3 — Agência de viagens: tabela Pacote
-- ========================================================

DROP TABLE IF EXISTS Pacote;

CREATE TABLE Pacote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destino VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    vagas INT NOT NULL,
    ativo TINYINT(1) DEFAULT 1
);

INSERT INTO Pacote (destino, preco, vagas, ativo) VALUES
('Bonito - MS', 1500.00, 0, 1),
('Gramado - RS', 2200.00, 15, 1),
('Foz do Iguaçu - PR', 1800.00, 12, 1),
('Salvador - BA', 1400.00, 5, 1),
('Curitiba - PR', 900.00, 20, 1);

-- Tarefa 3.a: Desativar pacote sem vagas
UPDATE Pacote 
SET ativo = 0 
WHERE destino = 'Bonito - MS' AND vagas = 0;

-- Tarefa 3.b: Reajuste de 10% no preço para pacotes com mais de 10 vagas
UPDATE Pacote 
SET preco = preco * 1.10 
WHERE vagas > 10;

-- Tarefa 3.c: Desconto de 15% nos pacotes com destino RS ou PR
UPDATE Pacote 
SET preco = preco * 0.85 
WHERE destino LIKE '%RS%' OR destino LIKE '%PR%';

-- Tarefa 3.d: Reduzir em 1 vaga do pacote mais barato
UPDATE Pacote 
SET vagas = vagas - 1 
ORDER BY preco ASC 
LIMIT 1;

-- Tarefa 3.e: Explicação de perigo do UPDATE sem WHERE
-- RESPOSTA: Um UPDATE no preço sem WHERE aplicaria o mesmo percentual de reajuste ou desconto a todos os pacotes
-- do catálogo (inclusive pacotes de luxo internacionais), gerando prejuízos financeiros gravíssimos ou cancelamentos.
