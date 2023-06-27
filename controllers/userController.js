const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser')
const { buildUser } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

class userController {
    constructor() {
      this.users = [];
    }
  
    async createUser(id, name, login, pass, age, weight, height, sex, obj, xp, routine_id) {
        // Checagens vai ser no banco

        if (idade < 0) {
            throw new Error("A idade não pode ser negativa.");
        }
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
                obj: obj,
                xp: xp,
                routine_id: routine_id,
            });
        
            const response = {
                newUser: newUser,
                message: 'Inserção do usuário foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado

            return response; // Envie a resposta JSON no caso de sucesso
        } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            //console.log(error)
            const response = {
                sql: error.parent.sql,
                parameters: error.parent.parameters,
                message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
      }
    }
  
    async getUserByLogin(login) { ?
      return this.users.find((user) => user.login === login) || null;
    }
  
    async updateUser(login, updateClause) {
      const user = this.getUserByLogin(login);
      if (user) {
        Object.assign(user, updates);
      }
    }
  
    deleteUser(login) {
      const index = this.users.findIndex((user) => user.login === login);
      if (index !== -1) {
        this.users.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  