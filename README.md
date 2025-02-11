# ClimaJá - App de Previsão do Tempo

[![Licença MIT](https://img.shields.io/badge/Licença-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v14.x-blue)](https://nodejs.org/)

## Descrição do Projeto

O **ClimaJá** é uma aplicação web que fornece informações climáticas em tempo real. Ela foi desenvolvida para oferecer uma solução prática, elegante e eficiente para visualizar as condições atuais para qualquer cidade. Com um design responsivo e intuitivo, o app garante uma experiência excelente em desktops, tablets e smartphones.

## Objetivo Geral

O projeto tem como propósito proporcionar aos usuários uma ferramenta confiável para acessar dados climáticos de suas cidades de interesse. Além de oferecer informações atualizadas, o ClimaJa permite que os usuários salvem suas cidades favoritas, agilizando futuras consultas.

## Funcionalidades

- **Busca de Cidades:** Permite pesquisar qualquer cidade para visualizar as condições climáticas atuais e a previsão de temperatura máxima e mínima.
- **Exibição de Dados Atualizados:**  
  - Temperatura atual (em °C)  
  - Umidade relativa do ar  
  - Velocidade do vento
- **Sistema de Login/Cadastro:**  
  Usuários podem se cadastrar, fazer login e salvar até 3 cidades como favoritas.
- **Cidades Favoritadas:**  
  Acesso rápido aos dados climáticos das cidades marcadas como favoritas.
- **Interface Responsiva e Clean:**  
  Design minimalista que se adapta a qualquer dispositivo.

## Tecnologias Utilizadas

### Backend

- **Node.js & Express:** Criação da API backend.
- **Prisma:** ORM para interação com o PostgreSQL.
- **PostgreSQL:** Banco de dados relacional.
- **JWT (JSON Web Tokens):** Autenticação e autorização.
- **Outras bibliotecas:** bcrypt, dotenv, cookie-parser, cors, TypeScript.

### Frontend

- **EJS:** Motor de template para renderização dinâmica.
- **JavaScript/TypeScript:** Lógica e manipulação do DOM.
- **CSS/SASS:** Estilização e design responsivo.

## Estrutura do Projeto

```plaintext
climaja/
├── backend/         # API Backend
├── frontend/        # Aplicação Frontend
├── build/           # Arquivos compilados
├── README.md        # Documentação do projeto
├── .gitignore       # Arquivos ignorados pelo Git
├── .env             # Variáveis de ambiente
├── package.json     # Configuração principal do projeto
└── tsconfig.json    # Configuração do TypeScript
```

## Estrutura do Backend
A estrutura interna do backend:

```plaintext
backend/
├── erros/                   # Definição de erros customizados
│   └── HttpError.ts
├── src/
│   ├── config/              # Configurações da aplicação
│   │   ├── database.ts      # Configuração do Prisma
│   │   └── env.ts           # Gerenciamento de variáveis de ambiente
│   ├── controllers/         # Lógica dos endpoints
│   │   ├── userController.ts
│   │   ├── homeController.ts
│   │   ├── authController.ts
│   │   └── weatherController.ts
│   ├── middlewares/         # Middlewares de validação e autenticação
│   │   ├── authMiddleware.ts
│   │   └── error-handler.ts
│   ├── routes/              # Definição das rotas da API
│   │   ├── authRoutes.ts
│   │   ├── homeRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── weatherRoutes.ts
│   ├── services/            # Lógica de negócio e integração com APIs
│   │   ├── userService.ts
│   │   └── weatherService.ts
│   ├── utils/               # Funções utilitárias
│   │   ├── jwt.ts           # Gerenciamento de JWT
│   │   ├── hash.ts          # Hash de senhas
│   │   └── apiClient.ts     # Cliente HTTP
│   └── app.ts               # Inicialização do servidor
└── tsconfig.json            # Configuração do Typescript
```

## Estrutura do Frontend
A estrutura interna do frontend:

```plaintext
frontend/
├── public/                  # Arquivos estáticos (HTML, imagens, ícones)
│   ├── styles/              # Estilização: CSS/SASS
│   │   ├── css/             # Arquivos CSS compilados
│   │   │   ├── homePageStyles.css
│   │   │   ├── loginStyle.css
│   │   │   └── registerStyle.css
│   │   └── scss/            # Arquivos SASS para desenvolvimento
│   │       ├── homePageStyles.scss
│   │       ├── loginStyle.scss
│   │       └── registerStyle.scss
│   ├── pages/               # Páginas renderizadas pelo EJS
│   │   ├── homePage.ejs
│   │   ├── Login.ejs
│   │   └── Register.ejs
│   ├── assets/              # Imagens, ícones e outros recursos
│   │   ├── apple-touch-icon.png
│   │   ├── ClimaJa-logo-png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   └── src/                 # Código fonte JavaScript/TypeScript
│       ├── scripts/         # Scripts para manipulação do DOM, troca de tema, etc.
│       │   ├── services/    # Integrações com APIs (ex.: weatherService, favoriteApi)
│       │   ├── utils/       # Funções utilitárias para o frontend
│       │   └── handlers/    # Handlers para eventos (busca de cidade, login, etc.)
│       └── homePageMain.ts  # Script principal da home
└── tsconfig.json            # Configuração do Typescript
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```dotenv
# URL de conexão com o banco de dados
DATABASE_URL=postgresql://user:password@localhost:5432/nome_do_banco

# Chave secreta para autenticação JWT
JWT_SECRET=sua_chave_secreta_aqui

# Porta do servidor
PORT=3000

# Chave da API OpenWeatherMap
api_Key=sua_chave_da_api_aqui

# URL da API OpenWeatherMap
api_URL=https://api.openweathermap.org/data/2.5/weather

# Ambiente de desenvolvimento
NODE_ENV=development
```

## Planos para o Futuro

- **Confirmação de Conta por Email**
- **Recuperação de Senha**
- **Previsão Estendida**

## Contribuição

1. **Fork o repositório.**
2. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b minha-nova-feature
   ```
3. **Realize os commits:**
   ```bash
   git commit -m "Descrição da feature implementada"
   ```
4. **Envie a branch para o repositório remoto:**
   ```bash
   git push origin minha-nova-feature
   ```
5. **Abra um Pull Request.**

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Fonte dos Dados Climáticos:
Este aplicativo utiliza a API OpenWeather para obter informações meteorológicas. Os dados exibidos pertencem à OpenWeather e estão sujeitos aos seus [termos de uso](https://openweathermap.org/terms).

## Contato

- **Email:** gabrieldg0885@gmail.com  
- **GitHub:** [Gabriel Dias](https://github.com/Gab0885)