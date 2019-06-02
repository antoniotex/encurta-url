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
    if(error){
      res.json({erro: error})
      return
    }
    res.json(item)
  })
})

router.post('/', function(req, res){
  const apelido = crypto.randomBytes(3).toString('hex');
  const urlEncurtada = `enc-it.firebaseapp.com/${req.body.apelido ? req.body.apelido : apelido}`
  const urlOriginal = req.body.urlOriginal

  Encurtador.findOne({urlOriginal: urlOriginal}, (error, item) => {
    if(item !== null){
      res.json(item)
    }else{
      const novoItem = new Encurtador({
        urlOriginal: urlOriginal.includes('http') ? urlOriginal : `https://${urlOriginal}`,
        apelido: req.body.apelido ? req.body.apelido : apelido,
        urlEncurtada: urlEncurtada
      })
      novoItem.save().then(function(item){
        res.json(item)
      })
    }
  }).catch(erro => console.log('erro vindo: ', erro))

})

module.exports = router