var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

var app = express()
var encurtador = require('../routes/api/encurtador')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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