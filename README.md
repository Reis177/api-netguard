# 🛡️ NetGuard API

[![Node.js Version](https://img.shields.io/badge/node-v24.15.0-blue.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-v4.19.0-green.svg)](https://expressjs.com/)
[![Mongoose Version](https://img.shields.io/badge/mongoose-v8.0.0-red.svg)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

O **NetGuard API** é uma solução robusta de gerenciamento e monitoramento de serviços em back-end, estruturada sob o padrão arquitetural **MVC (Model-View-Controller)**. A aplicação centraliza o controle de hosts e infraestrutura, oferecendo persistência de dados escalável com o MongoDB Atlas e rotinas inteligentes de resiliência de rede.

---

## 🚀 Principais Funcionalidades

* **Gerenciamento de Infraestrutura (Hosts):** CRUD completo para cadastro, edição, listagem e remoção de servidores ou ativos de rede através do `hostController`.
* **Conexão Resiliente (Anti-Fail DNS):** Mecanismo customizado que injeta os servidores de DNS públicos do Google (`8.8.8.8` / `8.8.4.4`) e força a resolução via IPv4 diretamente no núcleo da aplicação. Isso mitiga 100% o erro crítico `querySrv ECONNREFUSED` comum no Node.js v24 ao se comunicar com clusters do MongoDB Atlas.
* **Arquitetura Modular:** Separação estrita de responsabilidades utilizando Módulos ES (`import`/`export`), facilitando a manutenção e a escalabilidade do software.
* **Segurança de Credenciais:** Isolamento completo de strings de conexão e portas do servidor através de variáveis de ambiente (`.env`).

---

## 🛠️ Tecnologias Utilizadas

* **Runtime:** [Node.js v24.15.0](https://nodejs.org/)
* **Framework Web:** [Express](https://expressjs.com/)
* **Banco de Dados:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Nuvem)
* **ODM / Modelagem de Dados:** [Mongoose](https://mongoosejs.com/)
* **Gerenciador de Processos:** [Nodemon](https://nodemon.io/) (Ambiente de Desenvolvimento)
* **Segurança:** [Dotenv](https://github.com/motdotla/dotenv) (Variáveis de ambiente)

---

## 📂 Estrutura Arquitetural do Projeto

A API adota a estrutura **MVC**, garantindo que as regras de negócio, rotas e representações de dados fiquem completamente isoladas:

```text
api-netguard/
├── node_modules/        # Dependências instaladas pelo npm
├── src/
│   ├── config/          # Arquivos de configuração (Conexão com o Banco)
│   │   └── dbConncet.js
│   ├── controllers/     # Camada de Controle (Regras de negócio e lógica)
│   │   └── hostController.js
│   ├── models/          # Camada de Modelos (Mapeamento de Schemas do Mongoose)
│   ├── routes/          # Definição e agrupamento dos Endpoints da API
│   ├── app.js           # Configuração de Middlewares e inicialização do Express
│   └── server.js        # Entrypoint do sistema (Inicialização do Servidor HTTP)
├── .env                 # Variáveis de ambiente sensíveis (Oculto no Git)
├── .gitignore           # Arquivo de exclusão do ecossistema Git
├── package.json         # Manifesto do projeto e scripts de execução
└── README.md            # Documentação oficial do projeto
```

---

## ⚙️Configuração do Ambiente e Instalação

Siga os passos abaixo para clonar, configurar e rodar o projeto localmente na sua máquina de desenvolvimento.

* Clonar o Repositório

  ```text
  git clone [https://github.com/SEU_USUARIO/api-netguard.git](https://github.com/SEU_USUARIO/api-netguard.git)
  cd api-netguard
  ```

* instalar as Dependências
  ```text
  npm intall
  ```

* Configurar as Variáveis de Ambiente (.env)
  Crie um arquivo chamado **.env** exatamente na raiz do projeto (ao lado do arquivo **package.json**). Adicione as seguintes chaves de configuração:
   ```text
  # URL de Conexão Oficial do MongoDB Atlas (Padrão +srv)
    MONGODB_URI=mongodb+srv://SEU_USUARIO_BANCO:SUA_SENHA_BANCO@cluster0.0fcmbnj.mongodb.net/NetGuard?retryWrites=true&w=majority

  # Porta onde a API Express irá escutar as requisições HTTP
     PORT=3000
  ```
⚠️ Substitua: SEU_USUARIO_BANCO e SUA_SENHA_BANCO pelas credenciais reais criadas na aba Database Access dentro do painel do MongoDB Atlas.

* Inicializar a Aplicação
  Para rodar a API em modo de desenvolvimento com o recarregamento automático do **Nodemon**, execute:

   ```text
   npm start
  ```
  Se todas as configurações estiverem corretas, o terminal retornará as seguintes mensagens de sucesso:

  ```text
    [nodemon] starting `node src/server.js`
  🔄 Tentando conectar ao MongoDB Atlas (Via Google DNS)...
  ✅ Conectado ao MongoDB com sucesso!
  🌐 NetGuard API ativa localmente na porta 3000
  ```

## 👤 Desenvolvedor
  
  Desenvolvido com dedicação por Reis. Se este projeto te ajudou, deixe uma ⭐️ no repositório!
