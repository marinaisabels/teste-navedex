
 <img style="border-radius: 50%;" src="https://raw.githubusercontent.com/marinaisabels/teste-navedex/master/logo.png" width="100px;" alt=""/>

Desafio de back-end - Navedex API 
_____
## 💻 Sobre o projeto
O sistema consiste em um criador de navedex's, nele tu poderá se cadastrar utilizando email e senha, e então ao logar terá acesso ao banco de dados dos seus navers, possuindo informações como: nomes, data de nascimento, cargos, tempo de empresa e projetos que participou.
---

## ⚙️ Funcionalidades

- Possibilitar que um único usuário possa administrar diversos navers.
 - Autenticação

      - (Signup) Rota de cadastro 
        - Deverá receber email e senha e criar novo registro no banco

      - (Login) Rota para poder logar no sistema
        - Deverá retornar um token [JWT](https://jwt.io/) para o usuário ter acesso à outras rotas
- Navers

     - (Index) Rota para listagem dos Navers.

     - (Show) Rota para detalhar informações de um único naver através de seu identificador

     - (Store) Rota de Criação de Naver

     - (Delete) Rota Para Deletar um Naver
        - Recebe um identificador de naver e o remove dos registros do banco.
        - Um usuário só pode deletar seus próprios navers.

* Projetos

    - (Index) Rota para listagem dos Projetos

    - (Show) Rota para detalhar um projeto

    - (Store) Rota de Criação de Projeto

    - (Update) Rota Para Atualização de Projeto

    - (Delete) Rota Para Deletar um Projeto
---

## 🚀 Como executar o projeto

Esse é um projeto de Backend feito utilizando NodeJS, Express, Typescript e MySQL. Além disso, ele segue uma arquitetura baseada em MVC, com 3 camadas simples:

- Controller: responsável pela comunicação com agentes externos (como o Frontend)
- Model: responsável pela representação das nossas entidades
- Business: responsável pela lógica de negócio


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com/marinaisabels/teste-navedex/

# Acesse a pasta do projeto no terminal/cmd
$ cd desktop

# Vá para a pasta 
$ cd projeto

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:
 
([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[KnexJS](http://knexjs.org/)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
---

## 🖱️ Documentação do Projeto
- [Postman](https://documenter.getpostman.com/view/10578922/T1DpDdfv?version=latest)

## Dificuldades 

OS endpoints de detalhes dos navers e projetos não ficou como deveria. Trabalhei para relacionar as tabelas entre si mas não obtive êxito. Estudarei mais a documentação do MYSQL para melhorar esta parte do projeto.


## 👩🏿 Autora
Eu sou a <b>Marina</b>! <br/>
webdesigner, produtora audiovisual e apaixonada por programação. 💻


 Estudando as seguintes Linguagens:<br/>
⚡ Javascript - Typescript - React - HTML5 - Node.js - GIT - AWS - JEST


[Entre em contato](https://www.linkedin.com/in/marinaisabel/) ❤️

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
