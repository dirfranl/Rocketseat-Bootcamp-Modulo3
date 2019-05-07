const User = require('../models/User')

class SessionController {
  async store (req, res) {
    // Pega o email e senha do corpo da requisição
    const { email, password } = req.body
    // Busca se existe usuário com o email informado
    const user = await User.findOne({ email })
    // Caso não exista
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    // Verifica a senha informada
    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid Password' })
    }
    // Retorna o user e gera o token pena função estatica do model user
    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
