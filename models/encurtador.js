const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EncurtadorSchema = new Schema({
  urlOriginal: {
    type: String,
    required: true
  },
  apelido: {
    type: String,
    required: true
  },
  urlEncurtada: {
    type: String,
    required: true
  },
  data: {
      type: Date,
      default: Date.now
  },
})

module.exports = Encurtador = mongoose.model('encurtador', EncurtadorSchema)