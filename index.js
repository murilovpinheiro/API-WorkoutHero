const express = require('express');
const app = express();
const {User, sequelize} = require('./models/userModel');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');

    User.create({
      id: 2,
      name: 'vitormamoeu',
      login: 'johndoe@example.com',
      pass: 'senha123',
      age: 22,
      weight: 22,
      height: 22,
    })
      .then(newUser => {
        console.log(newUser);
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });


app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

