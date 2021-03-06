const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, purchase, content } = job.data

    await Mail.sendMail({
      from: '"Dirceu Franco" <dirfranl@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title} - ${purchase._id}`,
      // html: `<p>Teste: ${content}</p>`
      template: 'purchase',
      // Passamos as váriaveis ao template
      context: { user, content, ad: ad, purchase }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
