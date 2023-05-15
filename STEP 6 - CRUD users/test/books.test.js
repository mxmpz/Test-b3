import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
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
  // it('POST /books should return a bad request if ISBN malformed');
  // it('POST /books should return a bad request if price malformed');
  // it('POST /books should return a bad request if lang code malformed');
  it('GET /books/:id should return a success response with found book', function (done) {
    chai.request(api)
      .get('/books/9782746035966')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: {
            isbn13: '9782746035966',
            title: 'Cree su primer sitio web con dreamweaver 8',
            authors: 'B.A. GUERIN',
            editor: 'ENI',
            langCode: 'ES',
            price: 10.02
          }
        })
        done()
      })
  })
  it('GET /books/:id should return not found response if the book does not exists', function (done) {
    chai.request(api)
      .get('/books/1234567899999')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'Book 1234567899999 not found'
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
          data: {
            isbn13: '9782746035966',
            title: 'Cree su primer sitio web con dreamweaver 8',
            authors: 'B.A. GUERIN',
            editor: 'ENI',
            langCode: 'ES',
            price: 15.78
          }
        })
        done()
      })
  })
  it('PUT /books/:id should return not found response if the book does not exists', function (done) {
    const book = {
      isbn13: '1234567899999',
      title: 'Cree su primer sitio web con dreamweaver 8',
      authors: 'B.A. GUERIN',
      editor: 'ENI',
      langCode: 'ES',
      price: 15.78
    }
    chai.request(api)
      .put('/books/1234567899999')
      .send(book)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'Book 1234567899999 not found'
        })
        done()
      })
  })
  // it('PUT /books/:id should return a bad request if ISBN malformed');
  // it('PUT /books/:id should return a bad request if price malformed');
  // it('PUT /books/:id should return a bad request if lang code malformed');
  it('DELETE /books/:id should return a success response', function (done) {
    chai.request(api)
      .delete('/books/9782744005084')
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
    chai.request(api)
      .delete('/books/1234567899999')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'Book 1234567899999 not found'
        })
        done()
      })
  })
})
