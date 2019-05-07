const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        // $gte - greater then - o mongoose procura por preço maioe que
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        // $lte - less then - o mongoose procura pelo preço menor que
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      /**
       * RegExp - Verifica se a palavra enviada pelo user está contida no
       * titulo e não se a palavra informada é exatamente o titulo.
       * "i" - não importa se é maisculo ou minulsculo ele encontra
       */
      filters.title = new RegExp(req.query.title, 'i')
    }
    // para listar junto do Ads o autor no find usamos Ad,populate.find()
    // no paginate est'opção vai dentro do objeto
    // const ads = await Ad.find()
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt' // "-" para listar de forma decrescente
    })

    return res.json(ads)
  }
  // Mostra um unico anúncio
  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  async store (req, res) {
    // Juntamos a req o id do author
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findOneAndUpdate(req.params.id, req.body, {
      new: true // devolve para o front já atualizado
    })
    return res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findOneAndDelete(req.params.id)
    return res.json()
  }
}

module.exports = new AdController()
