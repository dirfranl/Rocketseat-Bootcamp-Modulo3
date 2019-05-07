const User = require('../models/User')

class UserController {
  async store (req, res) {
    // capturamos o email para verificar se já não tem cadastrado
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }
    // Se o email não existe ele segue a linha abaixo e cadastra o novo usuário
    const user = await User.create(req.body)

    return res.json(user)
  }
}

module.exports = new UserController()
