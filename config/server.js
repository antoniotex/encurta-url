var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

var app = express()
var encurtador = require('../routes/api/encurtador')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var bd = require('./keys').mongoURI

mongoose.connect(bd, { useNewUrlParser: true })
  .then(function(){
    console.log('Banco de Dados Conectado')
  })
  .catch(function(erro){
    console.log(erro)
  })

app.use('/api/encurtador', encurtador)

if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app