# 🎬 WVision – Plataforma de Gestão de Cinema

Bem-vindo ao **WVision**, um sistema web acadêmico para gestão de sessões de cinema, salas, filmes e ingressos. Este projeto foi desenvolvido com fins educacionais, visando o aprendizado prático de conceitos como:

- Manipulação do **DOM** com JavaScript
- Armazenamento e recuperação de dados com **Local Storage**
- Utilização de **Bootstrap 5** para estilização moderna
- Modularização com **classes e controllers**
- Interação de dados entre páginas

> Este projeto **não é comercial** – foi feito como parte de um estudo universitário e práticas de desenvolvimento front-end.

---

## 🧠 Sobre o Projeto

O **WVision** simula uma plataforma de gestão de um cinema, permitindo que usuários administrem os seguintes recursos:

- 📽️ **Filmes**: cadastro, edição, exclusão, carrosséis por categoria
- 🏛️ **Salas**: gerenciamento com capacidade e tipo (2D, 3D, IMAX)
- 🕑 **Sessões**: ligação entre filme e sala, com data, idioma e formato
- 🎟️ **Ingressos**: compra de ingressos com CPF, assento e tipo de pagamento
- 📦 **Persistência em LocalStorage**: dados salvos localmente no navegador

---

## ✨ Funcionalidades

| Funcionalidade        | Descrição |
|----------------------|-----------|
| 🎞️ Cadastro de Filmes | Formulário com imagem, gênero, classificação e duração |
| 🏟️ Cadastro de Salas | Inclui nome, capacidade e tipo da sala |
| 📅 Cadastro de Sessões | Seleção de filme e sala com filtro de sessões disponíveis |
| 💳 Venda de Ingressos | CPF, assento, tipo de pagamento (com emojis 😉) |
| ✅ Modais de Confirmação | Estilo moderno usando Bootstrap |
| 📂 LocalStorage         | Toda persistência feita no navegador |
| 🧾 Filtros e ações      | Filtros de sessões ativas, botões de edição e exclusão dinâmicos |

---

## 🛠️ Tecnologias Utilizadas

- HTML5 / CSS3
- JavaScript (moderno + módulos)
- Bootstrap 5
- Select2 (plugin de select com imagem)
- LocalStorage API
- Figma (protótipo visual e rascunho)

---

## 🗂️ Estrutura do Projeto

```bash
📁 src/
 ├── controllers/
 │    ├── film_controller.js
 │    ├── room_controller.js
 │    ├── session_controller.js
 │    └── tickets_controller.js
 │
 ├── models/
 │    ├── movie.js
 │    ├── rooms.js
 │    ├── session.js
 │    └── tickets.js
 │
 ├── js/
 │    └── load_components.js
 │
 ├── css/
 │    └── style.css
 │
 ├── ├── film.html
 │    ├── rooms.html
 │    ├── register_session.html
 │    ├── tickets.html
 │    └── list_sessions.html
```
## 🧪 Como testar
Clone o repositório ou baixe o ZIP

Abra index.html ou qualquer página diretamente no navegador

Navegue entre as páginas, cadastre filmes, salas, sessões e realize vendas

Os dados ficam salvos no seu navegador (mesmo após recarregar a página)

## 🧑‍🎓 Sobre o Projeto Acadêmico
Este projeto foi desenvolvido como parte de um estudo universitário, focando em:

Prática com componentes reutilizáveis

Modelagem de dados com classes JavaScript

Lógica de CRUD completo (Create, Read, Update, Delete)

Experiência do usuário com feedbacks visuais modernos

**Observação**: Este README foi gerado por IA e revisado e ajustado pelo autor do projeto.