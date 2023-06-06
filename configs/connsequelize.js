const Sequelize  = require('sequelize');

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize('heroworkout', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres', 
  logging: false,
});

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize