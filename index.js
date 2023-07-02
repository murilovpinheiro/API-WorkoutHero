const {app, sequelize} = require('./app');
const port = 3000;

app.get('/', (req, res) => {
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