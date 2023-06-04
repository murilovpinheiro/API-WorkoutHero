// Esse arquivo é o responsável pela conexão entre o banco de dados
const { Pool } = require('pg');
require('dotenv').config();

class conn {
  constructor() {
    this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
  }
  
  async conectar() {
    try {
      const client = await this.pool.connect();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
      return client;
    } catch (error) {
      console.log(process.env.DB_PASSWORD)
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error;
    }
  }

  liberar(client) {
    client.release();
    console.log('Cliente liberado e retornado à pool');
  }
}

module.exports = conn;
