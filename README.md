
# Challenger

Bem-vindo ao nosso projeto **Gerenciador de Entregas**! Este é um sistema simples que permite que os usuários se cadastrem, façam login e gerenciem entregas com facilidade. O projeto backend foi construído com **ReactJs**, uma biblioteca poderosa que nos permite criar projetos performáticos e bem estruturados.

### Link para o respositório backend
https://github.com/Rharan-Ru/monke-fullstack-challenge-backend

## Funcionalidades

- Tela de login
- Tela principal de tickets
- Integração com Google Maps API
- Mapa do GoogleMap
- Input de preenchimento automático de endereço e longitude e latitude
- Tabela de tickets

## Stack utilizada

**Front-end:** React, Tailwind, NextJs

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, você pode encontrar um exemplo no arquivo .env.example:

#### Development
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key`

`NEXT_PUBLIC_API_URL=http://localhost:3000`
```

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Rharan-Ru/monke-fullstack-challenge-frontend
```

Entre no diretório do projeto

```bash
  cd monke-fullstack-challenge-frontend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor com o comando

```bash
  npm run dev
```
## Screenshots

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/ChallengeLogin.png)

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/ChallengeMain.png)

![App Screenshot](https://github.com/Rharan-Ru/monke-fullstack-challenge-backend/blob/main/SwaggerUIChallenge.png)

## 🎨 Decisões Técnicas no Frontend

O frontend do projeto foi desenvolvido utilizando **React**, que foi uma escolha devido a um requisito do projeto. Abaixo, explico algumas das decisões técnicas tomadas para esta parte da aplicação:

### 1️⃣ ReactJs como Requisito
O **ReactJs** foi escolhido por ser um requisito deste projeto. Eu tenho experiência e conhecimento na tecnologia e tentei fazer o mais limpo e componentizável que eu conseguiria no prazo de entrega.

### 2️⃣ Interfaces Simples e Eficazes
Minha principal preocupação durante o desenvolvimento do frontend foi criar interfaces que fossem **simples** e ao mesmo tempo **eficazes**. O objetivo é que o usuário consiga navegar e entender o funcionamento da aplicação de forma intuitiva, sem complicações. Isso ajuda a manter a usabilidade e acessibilidade em níveis elevados, proporcionando uma experiência fluida.

### 3️⃣ Integração com Google API
Um dos requisitos era usar uma api para buscar pela latitude e longitude e também uma api de mapa que contenham marcadores, eu utilizei apenas a api do google por ser mais confiável e estável no uso e também para não ter que usar duas ou mais apis diferentes. O Autocomplete de endereços do Google também ajuda muito a fazer uma experiência agradável para o usuário que não precisa se preocupar em preencher muitos campos.

### 4️⃣ Tailwind CSS para Estilização
A escolha do **Tailwind CSS** para a estilização foi feita com base em sua simplicidade e na facilidade de criar **interfaces responsivas**. Utilizar o Tailwind permitiu que eu criasse layouts de forma rápida e eficiente, sem a necessidade de escrever estilos complexos. Isso resultou em um código de CSS mais enxuto e em uma boa performance, especialmente em dispositivos móveis.
