const express = require('express');
const app = express();
const controller = require('../controllers/userController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildUser } = require('../middlewares/middlewares');
const historic = require("../controllers/historicController")

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const UserController = new controller();
const HistoricController = new historic();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildUser, async (req, res) => {
  const whereClause = req.clause;

  let response = await UserController.getUserBy(whereClause);
  
  res.json(response);
  //console.log(whereClause)
});

// esse register pe desnecessário, também, o select insert aceita o obj e xp como vazio, sem problema e o build user já cuida dos vazios
router.post('/register', urlencodedParser, buildUser, async (req, res) => {
  const {name, login, pass, weight, height, sex} = req.clause;
  const age = 20;
  let response;
  console.log("Criando User")
  let user_response = await UserController.registerUser(name, login, pass, age, weight, height, sex);
  if(user_response.sucess){
    console.log("Criando Hist")
    let id = user_response.lastid;
    console.log("new user id: ", id)
    //console.log("createUser Response: ", response.createUserResponse)

    let historic_response = await HistoricController.createHistoric(id+1, id, 0, 0, 0, 0);

    if(historic_response.sucess) response = {sucess: true, newUser: user_response.newUser}
    else response = {
      sucess: false, 
      message: "Historic creation error", 
      historic_response: historic_response
    }

  }
  else response = {
    sucess: false, 
    message: "User creation error", 
    user_response: user_response
  }

  console.log("response: ", response)
  res.json(response);
});

router.post('/insert', urlencodedParser, buildUser, async (req, res) => {
  const { id, name, login, pass, age, weight, height, sex, obj, xp} = req.clause;

  let response = await UserController.createUser(id, name, login, pass, age, weight, height, sex, obj, xp);

  res.json(response);
  //console.log(req.body);
  
});
router.get('/select', urlencodedParser, buildUser, async (req, res) => {
  const whereClause = req.clause;

  let response = await UserController.getUserBy(whereClause);
  
  res.json(response);
  //console.log(whereClause)
});

router.post('/update', urlencodedParser, buildUser, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response  = await UserController.updateUser(id, updateClause);

  res.json(response);
  });

module.exports = router;
