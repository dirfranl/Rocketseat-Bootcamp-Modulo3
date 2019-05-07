module.exports = {
  /**
   * URL quando usa um serviço na nivem como o mongodbatlas
   * // mongodb://usuario:senha@localhost:27017/nomedadatabase
   * Abaixo sem usuário e senha, pois estamos conectando no docker
   */
  uri: process.env.DB_URL
}
