require('dotenv').config();
const Sequelize  = require('sequelize');

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING === 'true',
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