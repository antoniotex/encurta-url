const express = require('express')
const crypto = require('crypto')

const router = express.Router()

const Encurtador = require('../../models/encurtador')

router.get('/', function(req, res){
  Encurtador.find()
   .then(dadosURL => res.json(dadosURL))
})

router.get('/get/:apelido', function(req, res){
  Encurtador.findOne({ apelido:  req.params.apelido}, (error, item) => {
    res.json(item)
  })
})

router.post('/', function(req, res){

  const apelido = crypto.randomBytes(3).toString('hex');
  urlEncurtada = `enc-it.firebaseapp.com/${req.body.apelido ? req.body.apelido : apelido}`

  const novoItem = new Encurtador({
    urlOriginal: req.body.urlOriginal,
    apelido: req.body.apelido ? req.body.apelido : apelido,
    urlEncurtada: urlEncurtada
  })
  novoItem.save().then(function(item){
    res.json(item)
  })
})

module.exports = router