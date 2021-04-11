const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Utilizando o json do body-parser
app.use(bodyParser.json())

//Utilizando urlencoded para decodificar paramentros a serem passados por url
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Servidor iniciado no endereço localhost:3000 !')
})

app.listen(3000)