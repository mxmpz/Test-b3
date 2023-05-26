import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)

describe('Books', function () {
  it('GET /books should return a success response with all books', function (done) {
    chai.request(api)
      .get('/books')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              isbn13: '9782744005084',
              title: 'UML et C++',
              authors: 'Richard C. Lee, William M. Tepfenhart',
              editor: 'CampusPress',
              langCode: 'FR',
              price: 29.95
            },
            {
              isbn13: '9782746035966',
              title: 'Cree su primer sitio web con dreamweaver 8',
              authors: 'B.A. GUERIN',
              editor: 'ENI',
              langCode: 'ES',
              price: 10.02
            }
          ]
        })
        done()
      })
  })

  it('POST /books should create the book and return a success response with the book', function (done) {
    const book = {
      isbn13: '9782879017198',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    }
    chai.request(api)
      .post('/books')
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(201)
        chai.expect(res.body).to.deep.equal({
          data: book
        })
        done()
      })
  })

  it('POST /books should return a bad request if ISBN malformed', function (done) {
    const book = {
      isbn13: '77',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    }
    if (book.isbn13.length !== 13) {
      chai.request(api)
        .post('/books')
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `ISBN of Book ${book.isbn13} is malformed`
          })
          done()
        })
    }
  })

  it('POST /books should return a bad request if price malformed', function (done) {
    const book = {
      isbn13: '9782879017198',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 'xr'
    }
    if (typeof book.price !== 'number') {
      chai.request(api)
        .post('/books')
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Price of Book is malformed'
          })
          done()
        })
    }
  })

  it('POST /books should return a bad request if lang code malformed', function (done) {
    const book = {
      isbn13: '9782879017198',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 4655,
      price: 3.9
    }
    if (typeof book.langCode !== 'string' && book.langCode.length !== 2) {
      chai.request(api)
        .post(`/books/${book.isbn13}`)
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Lang Code of Book ${book.isbn13} is malformed`
          })
          done()
        })
    }
  })

  it('GET /books/:id should return a success response with found book', function (done) {
    const book = {
      isbn13: '9782746035966',
      title: 'Cree su primer sitio web con dreamweaver 8',
      authors: 'B.A. GUERIN',
      editor: 'ENI',
      langCode: 'ES',
      price: 15.78
    }
    chai.request(api)
      .get('/books/9782746035966')
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: book
        })
        done()
      })
  })

  it('GET /books/:id should return not found response if the book does not exists', function (done) {
    const book = {
      isbn13: '9782746035966',
      title: 'Cree su primer sitio web con dreamweaver 8',
      authors: 'B.A. GUERIN',
      editor: 'ENI',
      langCode: 'ES',
      price: 15.78
    }
    const idError = '1234567899999'

    chai.request(api)
      .get(`/books/${idError}`)
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Book ${idError} not found`
        })
        done()
      })
  })

  it('PUT /books/:id should return a success response with found book', function (done) {
    const book = {
      isbn13: '9782746035966',
      title: 'Cree su primer sitio web con dreamweaver 8',
      authors: 'B.A. GUERIN',
      editor: 'ENI',
      langCode: 'ES',
      price: 15.78
    }
    chai.request(api)
      .put('/books/9782746035966')
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: book
        })
        done()
      })
  })

  it('PUT /books/:id should return not found response if the book does not exists', function (done) {
    const book = {
      isbn13: '9782746035966',
      title: 'Cree su primer sitio web con dreamweaver 8',
      authors: 'B.A. GUERIN',
      editor: 'ENI',
      langCode: 'ES',
      price: 15.78
    }
    const idError = '1234567899999'

    chai.request(api)
      .put(`/books/${idError}`)
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Book ${idError} not found`
        })
        done()
      })
  })

  it('PUT /books/:id should return a bad request if ISBN malformed', function (done) {
    const book = {
      isbn13: '77',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 3.9
    }
    if (book.isbn13.length !== 13) {
      chai.request(api)
        .put(`/books/${book.isbn13}`)
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `ISBN of Book ${book.isbn13} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /books/:id should return a bad request if price malformed', function (done) {
    const book = {
      isbn13: '9782879017198',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 'FR',
      price: 'xr'
    }
    if (typeof book.price !== 'number') {
      chai.request(api)
        .put(`/books/${book.isbn13}`)
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Price of Book ${book.isbn13} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /books/:id should return a bad request if lang code malformed', function (done) {
    const book = {
      isbn13: '9782879017198',
      title: 'Connaitre la Cuisine du Périgord',
      authors: 'Thibault Clementine',
      editor: 'Sud Ouest',
      langCode: 4655,
      price: 3.9
    }
    if (typeof book.langCode !== 'string' && book.langCode.length !== 2) {
      chai.request(api)
        .put(`/books/${book.isbn13}`)
        .send(book)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Lang Code of Book ${book.isbn13} is malformed`
          })
          done()
        })
    }
  })

  it('DELETE /books/:id should return a success response', function (done) {
    const bookDeleteId = '9782744005084'
    chai.request(api)
      .delete(`/books/${bookDeleteId}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          meta: {
            _deleted: {
              isbn13: '9782744005084',
              title: 'UML et C++',
              authors: 'Richard C. Lee, William M. Tepfenhart',
              editor: 'CampusPress',
              langCode: 'FR',
              price: 29.95
            }
          }
        })
        done()
      })
  })

  it('DELETE /books/:id should return not found response if the book does not exists', function (done) {
    const idError = '1234567899999'
    chai.request(api)
      .delete(`/books/${idError}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Book ${idError} not found`
        })
        done()
      })
  })
})
