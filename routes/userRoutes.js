const express = require('express');
const app = express();
const UserController = require('../controllers/userController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildUser } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildUser, async (req, res) => {
  const whereClause = req.clause;

  let response = await UserController.getUserBy(whereClause);
  
  res.json(response);
  //console.log(whereClause)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;

  let response = await UserController.deleteUserBy(id);

  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, name, login, pass, age, weight, height, sex, obj, xp, routine_id} = req.body;

  let response = await UserController.createUser(id, name, login, pass, age, weight, height, sex, obj, xp, routine_id);

  res.json(response);
  //console.log(req.body);
  
});

router.post('/update', urlencodedParser, buildUser, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response  = await UserController.updateUser(id, updateClause);

  res.json(response);
  });

module.exports = router;
