const mongoose = require('mongoose')
// Adicionamos o "yarn add mongoose-oaginate" para fazer a paginação dos
// anuncios
const mongoosePaginate = require('mongoose-paginate')

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    // Se for necessário mais de 1 autor colocar o objeto dentro de array
    type: mongoose.Schema.Types.ObjectId, // Relacionamento com id do user
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Ad.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', Ad)
