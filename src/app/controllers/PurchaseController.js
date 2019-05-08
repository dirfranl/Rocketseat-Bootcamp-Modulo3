const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchase = await Purchase.create({ ad: ad, user: req.userId })

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      purchase,
      content
    }).save()

    return res.json(purchase)
  }

  async destroy (req, res) {
    await Purchase.findByIdAndDelete(req.params.id)
    res.send()
  }
}

module.exports = new PurchaseController()
