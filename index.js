const express = require('express');
const app = express();
const path = require('path');
const {User, sequelize} = require('./models/userModel');

const userRoutes = require('./routes/userRoutes')
const routineRoutes = require('./routes/routineRoutes')

const port = 3000;

app.use("/user", userRoutes)
app.use("/routine", routineRoutes)


app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

app.get('/form/user_insert', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/userPlaceholders/user_insertForm.html'));
});

app.get('/form/user_select', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/userPlaceholders//user_selectForm.html'));
});

app.get('/form/user_delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/userPlaceholders/user_deleteForm.html'));
});

app.get('/form/user_update', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/userPlaceholders/user_updateForm.html'));
});

app.get('/form/routine_insert', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/routinePlaceholders/routine_insertForm.html'));
});

app.get('/form/routine_select', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/routinePlaceholders/routine_selectForm.html'));
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