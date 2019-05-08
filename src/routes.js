const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()
/**
 * Adicionamos o "yarn add require-dir" criamos o index.js dentro de controllers
 */
const Controllers = require('./app/controllers')
const validators = require('./app/validators')

// middlewares
const authMiddleware = require('./app/middlewares/auth')

routes.post(
  '/users',
  validate(validators.User),
  handle(Controllers.UserController.store)
)

routes.post(
  '/sessions',
  validate(validators.Session),
  handle(Controllers.SessionController.store)
)
// todas as rotas a partir da linha abaixo verificara se o user está autenticado
routes.use(authMiddleware)
/**
 * Ads
 */
routes.get('/ads', handle(Controllers.AdController.index))
routes.get('/ads/:id', handle(Controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(Controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(Controllers.AdController.update)
)
routes.delete('/ads/:id', handle(Controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(Controllers.PurchaseController.store)
)
routes.delete('/purchases/:id', handle(Controllers.PurchaseController.destroy))

routes.put('/purchases/:id', handle(Controllers.ApprovedController.update))

module.exports = routes
