const express = require('express')

const router = express.Router()

const Encurtador = require('../../models/encurtador')

router.get('/', function(req, res){
  Encurtador.find()
   .then(dadosURL => res.json(dadosURL))
})

router.post('/', function(req, res){
  console.log(req.body)
  const novoItem = new Encurtador({
    urlOriginal: req.body.urlOriginal,
    apelido: req.body.apelido,
    urlEncurtada: req.body.urlEncurtada
  })
  novoItem.save().then(function(item){
    res.json(item)
  })
})

module.exports = router