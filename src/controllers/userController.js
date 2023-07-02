const express = require('express');
const app = express();
const {User, sequelize} = require('../models/userModel');
var bodyParser = require('body-parser')

const { Workout } = require('../models/workoutModel');

class UserController {

    async createUser(id, name, login, pass, age, weight, height, sex, obj, xp) { //, routine_id
         // Checagens vai ser no banco

        try {
            const checkEmptyString = (value) => (value === "") ? null : value;

            // Executa a checagem em cada campo necessário
            const checkedName = checkEmptyString(name); //? isso aqui já é feito nos middlewares não precisa ser feito no Controller
            const checkedLogin = checkEmptyString(login);
            const checkedPass = checkEmptyString(pass);
            const checkedSex = checkEmptyString(sex);
            const checkedObj = checkEmptyString(obj);
          
            // Aqui você pode usar os campos verificados para criar o usuário
            // ou realizar outras operações necessárias
            // Exemplo:
            const newUser = await User.create({
              id: id,
              name: checkedName,
              login: checkedLogin,
              pass: checkedPass,
              age: age,
              weight: weight,
              height: height,
              sex: checkedSex,
              obj: checkedObj,
              xp: xp,
              //routine_id: routine_id
            });
        
            const response = {
                newUser: newUser,
            };

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

    async registerUser(name, login, pass, age, weight, height, sex){
      try{
        whereClause = {
          login: login 
        }
        console.log("Procurando outros usuários com login: " + login)
        const usersWithSameLogin = (await User.findAll({
          where: whereClause,
        })).map(usersWithSameLogin => usersWithSameLogin.toJSON());
        if (usersWithSameLogin.length === 0) {
          console.log("Não foi encontrado outros usuários com login: " + login)
          lastid = 0;
          console.log("Buscando usuário de maior id.")
          const allUsers = (await User.findAll()).map(usersWithSameLogin => usersWithSameLogin.toJSON());
          
          allUsers.forEach(user => {
                              if (user.id > lastid){
                                lastid = user.id
                                console.log("Maior id atual: " + lastid)
                              }
                           });;
          lastid += 1;
          console.log("Novo id encontrado: " + lastid)
          return await this.createUser(lastid, name, login, pass, age, weight, height, sex, " ", 0);
          
        }else{
          console.log("Foi encontrado um usuário com o login: " + login)
          return {message: "Já existe um usuário com este login!."}
        }
      }
      catch(error){
        const response = {
          message: error.message,
        };
        return response; 
      }
    }
  
    async getUserBy(whereClause) {
      try {
        const records = await User.findAll({
          where: whereClause
          /*include: [{
            model: Routine,
            as: 'User_Routine',
            include: {
              model: Workout,
              as: "workoutList"
            }
          }],*/
        });
    
        if (records.length === 0) {
          return { message: "Nenhum registro encontrado." };
        } else {
          return records.map(record => record.toJSON());
        }
      } catch (error) {
        const response = {
          message: error.message,
        };
        if (error.parent && error.parent.sql) {
          response.sql = error.parent.sql;
          response.parameters = error.parent.parameters;
        }
        return response;
      }
    };
    
  
  
    async updateUser(id, updateClause) {
        try {
            const user = await User.findByPk(id);
            if (user) {
              const updateUser = await user.update(updateClause);
              const response = {
                updateUser: updateUser,
                message: 'Usuário atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Usuário não encontrado.'};
            }
          } catch (error) {
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response;
            }
        }

    async deleteUserBy(id) {
        try {
            const numDeleted = await User.destroy({
               where: { id: id }
            });
            //console.log(numDeleted);
            if (numDeleted >= 1){
                return {message: "Usuário excluído com sucesso."};
            }
            else{
               return {message: "Nenhum usuário encontrado com o ID fornecido."};
            }
            } catch{
             const response = {
               sql: error.parent.sql,
               parameters: error.parent.parameters,
               message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
           }
    }
}
  
module.exports = UserController;