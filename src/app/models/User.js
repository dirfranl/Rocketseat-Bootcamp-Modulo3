const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// jsonwebtoken que gera os token e verifica se estão validados
const jwt = require('jsonwebtoken')
// Configurações do jwt
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  }
})

// geramos a criptografia da senha
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

// Método utilizado para comparar a senha cadastrada com a informada
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

/**
 * Método estatico para ser acessado direto e não pro um objeto instanciado
 */
UserSchema.statics = {
  // Recebe user e com a desestruturação do js pegamos apenas o id
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}
module.exports = mongoose.model('User', UserSchema)
