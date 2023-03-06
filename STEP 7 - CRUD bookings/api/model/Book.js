
export default class Book {
  /**
   * Constructeur
   * @constructor
   *
   * @param {String} title    - Titre du livre
   * @param {String} authors  - Nom et prénom de(s) (l')auteur(s)
   * @param {String} editor   - Nom de l'éditeur
   * @param {String} langCode - Code langue ISO 639-1
   * @param {Float}  price    - Prix du livre
   * @param {String} isbn13   - Code barre du livre ISBN-13, sert d'identifiant
   */
  constructor(isbn13, title, authors, editor, langCode, price) {
    this.isbn13   = isbn13;
    this.title    = title;
    this.authors  = authors;
    this.editor   = editor;
    this.langCode = langCode;
    this.price    = price;
  }
}
