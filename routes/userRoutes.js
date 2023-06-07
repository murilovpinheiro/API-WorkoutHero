const express = require('express');
const app = express();
const {User, sequelize} = require('../models/userModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildWhereUser } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois

router.get('/select', buildWhereUser, async (req, res) => {
  const whereClause = req.whereClause;
  //console.log(whereClause)
  try{
      const records = (await User.findAll({
        where: whereClause,
      })).map(record => record.toJSON());

      if (records.length === 0) {
        res.json({message: "Nenhum registro encontrado."})
      }else{
        res.json(records); // Imprima os registros como JSON
      }
      

  }catch(error){
  // já já mudar o erro para JSON
      const response = {
        sql: error.parent.sql,
        parameters: error.parent.parameters,
        message: error.original.message,
      };
      res.json(response); // Envie a resposta JSON no caso de erro
      //console.error('Erro ao pesquisar registros:', error);
  }
});

router.post('/insert',urlencodedParser ,async (req, res) => {
  const { id, name, login, pass, age, weight, height, sex} = req.body;
  //console.log(req.body);
  try {
    const newUser = await User.create({ // criando o usuário
      id: id,
      name: name,
      login: login,
      pass: pass,
      age: age,
      weight: weight,
      height: height,
      sex: sex,
    });

    const response = {
      newUser: newUser,
      message: 'Inserção do usuário foi efetuada corretamente.',
    }; // retornando o JSON para ver o resultado

    res.json(response); // Envie a resposta JSON no caso de sucesso
  } catch (error) {
    //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
    //console.log(error)
    const response = {
      sql: error.parent.sql,
      parameters: error.parent.parameters,
      message: error.original.message,
    };
    res.json(response); // Envie a resposta JSON no caso de erro
  }
});

module.exports = router