# 📚 Atividades e Práticas — MySQL + Node.js + React Native

Repositório unificado com as soluções completas das atividades práticas propostas no curso do professor [wdiasmaciel](https://github.com/wdiasmaciel).

---

## 📌 Status das Atividades

| Tópico / Módulo | Atividade Proposta | Status | Localização |
| :--- | :--- | :---: | :--- |
| **01-node-mysql-react-native** | Banco Loja de Informática (Cliente, Produto, Pedido) | ✅ Já Criado | Repositório `AULA-01` (`init.sql`) |
| **01-banco-de-dados-mysql (05)** | Empresa Aviação (Voo - 17 consultas) | ✅ Já Criado | `Downloads/empresa_aviacao_completo.sql` |
| **01-banco-de-dados-mysql (05)** | Empresa Hotelaria (Hotel - 20 consultas) | ✅ Já Criado | `Downloads/empresa_hotelaria.sql` |
| **01-banco-de-dados-mysql (06)** | Fornecedor (15 exercícios de Inserção, Restrições e SELECT) | 🚀 **Resolvido aqui** | `01-banco-de-dados-mysql/06-fornecedor-restricoes-insert-select/` |
| **01-banco-de-dados-mysql (07)** | UPDATE em tabelas MySQL (Exercícios 1 a 5, incluindo 7-b e 7-c) | 🚀 **Resolvido aqui** | `01-banco-de-dados-mysql/07-fornecedor-update/` |
| **01-banco-de-dados-mysql (14)** | ALTER TABLE (20 exercícios completos) | 🚀 **Resolvido aqui** | `01-banco-de-dados-mysql/14-alter-table/` |
| **02-node-mysql-react-native** | Ex 1 e 2: API Node.js para Loja de Informática | ✅ Já Criado | Repositório `AULA-01` (`server.js`, `rotas/`) |
| **02-node-mysql-react-native** | Ex 3: API Node.js para Site de Viagens | 🚀 **Resolvido aqui** | `02-node-mysql/03-site-viagens/` |
| **02-node-mysql-react-native** | Ex 4: API Node.js para Controle de Estoque nas Filiais | 🚀 **Resolvido aqui** | `02-node-mysql/04-controle-estoque/` |
| **03-node-mysql-react-native** | Ex 1 e 2: App React Native para Loja de Informática | ✅ Já Criado | Repositório `AULA-01/meu-app` |
| **03-node-mysql-react-native** | Ex 3: App React Native para Site de Viagens | 🚀 **Resolvido aqui** | `03-react-native/site-viagens/` |
| **03-node-mysql-react-native** | Ex 4: App React Native para Controle de Estoque | 🚀 **Resolvido aqui** | `03-react-native/controle-estoque/` |

---

## 📂 Estrutura do Repositório

```text
atividades-mysql/
├── 01-banco-de-dados-mysql/
│   ├── 06-fornecedor-restricoes-insert-select/
│   │   └── exercicios_fornecedor.sql       # 15 exercícios resolvidos e comentados
│   ├── 07-fornecedor-update/
│   │   └── exercicios_update.sql           # Exercícios 1 a 5 (incluindo 7-b e 7-c)
│   └── 14-alter-table/
│       └── exercicios_alter_table.sql      # 20 exercícios de alteração estrutural
│
├── 02-node-mysql/
│   ├── 03-site-viagens/
│   │   ├── init.sql                        # DDL e DML de cliente, destino_turistico e pacote_viagem
│   │   ├── package.json
│   │   ├── bd.js                           # Pool de conexão MySQL2
│   │   ├── server.js                       # Servidor Express com todos os endpoints
│   │   ├── api.http                        # Testes com REST Client
│   │   └── rotas/                          # CRUD completo modularizado
│   └── 04-controle-estoque/
│       ├── init.sql                        # Fornecedor, Produto, Identificacao, Filial, Estoque
│       ├── package.json
│       ├── bd.js
│       ├── server.js
│       ├── api.http
│       └── rotas/                          # CRUD completo modularizado
│
└── 03-react-native/
    ├── site-viagens/
    │   ├── App.tsx                         # Navegação por abas
    │   └── components/
    │       ├── TelaClientes.tsx            # CRUD com interface mobile
    │       ├── TelaDestinos.tsx
    │       └── TelaPacotes.tsx
    └── controle-estoque/
        ├── App.tsx
        └── components/
            ├── TelaFornecedores.tsx
            ├── TelaProdutos.tsx
            ├── TelaFiliais.tsx
            └── TelaEstoque.tsx
```

---

## 🚀 Como Executar

### 1. Banco de Dados MySQL
Importe os scripts `.sql` pelo MySQL Workbench ou terminal:
```bash
mysql -u root -p < 01-banco-de-dados-mysql/06-fornecedor-restricoes-insert-select/exercicios_fornecedor.sql
mysql -u root -p < 02-node-mysql/03-site-viagens/init.sql
mysql -u root -p < 02-node-mysql/04-controle-estoque/init.sql
```

### 2. APIs Node.js
Entre na pasta do projeto desejado:
```bash
cd 02-node-mysql/03-site-viagens
npm install
npm start
```
As requisições podem ser testadas diretamente pelo arquivo `api.http` no VS Code.

---

## 👤 Autor
- **Pedro Clemente** ([@pedropjemedeiros-source](https://github.com/pedropjemedeiros-source))
