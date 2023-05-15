export default class Booking {
  /**
   * Constructeur
   * @constructor
   *
   * @param {String} id         - Identifiant de la location
   * @param {String} rentDate   - Date de location
   * @param {String} returnDate - Date de retour
   * @param {Book}   book       - Elément loué
   * @param {User}   user       - Utilisateur qui loue l'élément
   */
  constructor (id, rentDate, returnDate, book, user) {
    this.id = id
    this.rentDate = rentDate
    this.returnDate = returnDate
    this.book = book
    this.user = user
  }
}
