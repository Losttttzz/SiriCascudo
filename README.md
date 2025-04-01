# Siri Cascudo

Bem-vindo ao **Siri Cascudo**, o site onde você pode criar os seus próprios hambúrgueres personalizados, inspirado no famoso desenho Bob Esponja! 🦀🍔

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS e JavaScript (vanilla)
- **Backend:** Node.js com Express
- **Banco de Dados:** MongoDB
- **API:** Desenvolvida em Express para gerenciar pedidos e ingredientes

## Objetivo do Projeto 🎯

Este projeto foi desenvolvido com o propósito de estudar a programação assíncrona e síncrona no JavaScript. A API implementa operações que demonstram o uso de async/await, promises e manipulação eficiente de dados no banco de dados MongoDB. Dessa forma, proporciona um aprendizado prático sobre o fluxo de execução em aplicações web modernas.

## Funcionalidades

✅ Personalize seu hambúrguer com diversos ingredientes

✅ Visualização em tempo real da sua criação

✅ Sistema de pedidos integrado com o backend

✅ Banco de dados para armazenar pedidos

✅ Interface simples e divertida


## Como Rodar o Projeto 🚀

### 1️⃣ Clonar o Repositório
```bash
 git clone https://github.com/Losttttzz/SiriCascudo.git
```

### 2️⃣ Instalar as Dependências
```bash
 cd data
 npm install

 cd ui
 npm install
```

### 3️⃣ Configurar as Variáveis de Ambiente
Crie um arquivo **.env** na raiz do projeto e adicione:
```
MONGO_URI=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/burgerdb
PORT=3000
```

### 4️⃣ Iniciar o Servidor Backend
```bash
 cd data
 npm start

 cd ui
 npm start
```

### 5️⃣ Abrir o Frontend
Basta abrir o arquivo **index.html** no seu navegador.

## API Endpoints 🌐

| Método | Rota          | Descrição |
|--------|--------------|-----------|
| POST   | localhost:3000/orders   | Cria um novo pedido |
| GET    | localhost:3000/orders  | Lista todos os pedidos |

## Contribuição 🤝
Fique à vontade para contribuir com melhorias no código ou novas funcionalidades! Basta seguir o fluxo:
1. Faça um **fork** do repositório
2. Crie uma nova **branch** (`feature/nova-funcionalidade`)
3. Faça um **commit** das suas mudanças
4. Envie um **pull request**

## Criadores 📨
Caso tenha dúvidas ou sugestões, entre em contato com os criadores do projeto:
<div style="display: flex">
  <a href="https://github.com/Losttttzz">
  <img src="https://github.com/Losttttzz.png" alt="nehmers" width="120px">
</a>

<a href="https://github.com/davipiassi">
  <img src="https://github.com/davipiassi.png" alt="piassi" width="120px">
</a>
</div>

## Licença 📜
Este projeto é open-source e segue a licença MIT.

---

Divirta-se criando hambúrgueres no **Siri Cascudo**! 🍔🔥
