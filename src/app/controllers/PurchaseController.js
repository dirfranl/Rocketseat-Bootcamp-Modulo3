const Ad = require('../models/Ad')
const User = require('../models/User')
// const Mail = require('../services/Mail')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    // Movido para o PurchaseMail da pasta Jobs para roda em background
    // await Mail.sendMail({
    //   from: '"Dirceu Franco" <dirfranl@gmail.com>',
    //   to: purchaseAd.author.email,
    //   subject: `Solicitação de compra: ${purchaseAd.title}`,
    //   // html: `<p>Teste: ${content}</p>`
    //   template: 'purchase',
    //   // Passamos as váriaveis ao template
    //   context: { user, content, ad: purchaseAd }
    // })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
