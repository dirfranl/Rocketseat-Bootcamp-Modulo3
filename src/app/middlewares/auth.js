const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
// transforma uma função callback in promisse
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  // Intercepta o token
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' })
  }

  /**
   * O Authorization: Bearer TOKEN vem com está palavra Beare então abaixo
   * removemos usando a desestruturação e split
   */
  const [, token] = authHeader.split(' ')

  try {
    // decoded recebe id do usuario. "Veja model User método estático"
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    // Todas as rotas que passam por este middleware para frente terá qual user
    // está fazendo a requisição
    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!' })
  }
}
