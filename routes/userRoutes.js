const express = require('express');
const app = express();
const {User, sequelize} = require('../models/userModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildUser } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildUser, async (req, res) => {
  const whereClause = req.clause;
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

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  try {
   const numDeleted = await User.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "Usuário excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum usuário encontrado com o ID fornecido."});
    }
  } catch{
    const response = {
      sql: error.parent.sql,
      parameters: error.parent.parameters,
      message: error.original.message,
    };
    res.json(response); // Envie a resposta JSON no caso de erro
  }
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, name, login, pass, age, weight, height, sex, obj, xp, routine_id} = req.body;
  let response = createUser(id, name, login, pass, age, weight, height, sex, obj, xp, routine_id);
  res.json(response)
  //console.log(req.body);
  
});

router.post('/update', urlencodedParser, buildUser, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const updateUser = await user.update(updateClause);
      const response = {
        updateUser: updateUser,
        message: 'Usuário atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'Usuário não encontrado.'});
    }
  } catch (error) {
    const response = {
      sql: error.parent.sql,
      parameters: error.parent.parameters,
      message: error.original.message,
    };
  }
});

module.exports = router
