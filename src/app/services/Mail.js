const nodemailer = require('nodemailer')
const path = require('path')
// Carrega templates html mais simples, onde necessitamos apenas de variáveis e
// html.
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailconfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailconfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

/**
 * Aqui este Middleware define como o nodemailer lida com os templates de e-mail
 * Em partialsDir definimos templates parciais que geralmente se repe tem em
 * vários emails.
 * extName - informamos a extensão dos templates a ser carregado
 */
transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials')
    }),
    viewPath,
    extName: '.hbs'
  })
)
module.exports = transport
