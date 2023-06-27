const express = require('express');
const app = express();
const path = require('path');

const {User, sequelize} = require('./models/userModel');

const userRoutes = require('./routes/userRoutes')
const routineRoutes = require('./routes/routineRoutes')
const routes = require('./routes/htmlRoutes');

const port = 3000;

app.use("/user", userRoutes)
app.use("/routine", routineRoutes)
app.use('/form', routes);

app.get('/form', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });

app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});