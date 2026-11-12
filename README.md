## text
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
