const express = require('express');
const app = express();
const {User, sequelize} = require('../models/userModel');
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/user', (req, res) => {
    User.findAll().then(records => {
        const jsonRecords = records.map(record => record.toJSON());
        res.json(jsonRecords); // Imprima os registros como JSON
    }).catch(error => {
        console.error('Erro ao consultar registros:', error);
    })
});

module.exports = router