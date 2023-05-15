import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)
function generateUUID () {
  let uuid = ''; let i; let random
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}
const uuid = generateUUID()

describe('Users', function () {
  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
      .get('/users')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              id: '1281464365499',
              lastName: 'CADIEUX',
              firstName: 'Marius',
              birthDate: '1985-10-27',
              address: '3 Rue Henri Hure 49300 Cholet',
              phone: '0666666666',
              email: 'mariuscadieux@gmail.com'
            },
            {
              id: '5643431345887',
              lastName: 'TALON',
              firstName: 'Alicia',
              birthDate: '1992-07-26',
              address: '3 Rue Henri Hure 49300 Cholet',
              phone: '0777777777',
              email: 'talonalicia@gmail.com'
            }
          ]
        })
        done()
      })
  })
  it('POST /users should create the user and return a success response with the user', function (done) {
    const user = {
      id: uuid,
      lastName: 'Narcisse',
      firstName: 'Axel',
      birthDate: '1974-02-21',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0677667766',
      email: 'narcisseaxel@gmail.com'
    }
    chai.request(api)
      .post('/users')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(201)
        chai.expect(res.body).to.deep.equal({
          data: user
        })
        done()
      })
  })
  it('GET /users/:id should return a success response with found user', function (done) {
    chai.request(api)
      .get('/users/1281464365499')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: {
            id: '1281464365499',
            lastName: 'CADIEUX',
            firstName: 'Marius',
            birthDate: '1985-10-27',
            address: '3 Rue Henri Hure 49300 Cholet',
            phone: '0666666666',
            email: 'mariuscadieux@gmail.com'
          }
        })
        done()
      })
  })
  it('GET /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
      .get('/users/' + uuid)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'User ' + uuid + ' not found'
        })
        done()
      })
  })
  it('PUT /users/:id should return a success response with found user', function (done) {
    const user = {
      id: '5643431345887',
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@gmail.com'
    }
    chai.request(api)
      .put('/users/5643431345887')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: {
            id: '5643431345887',
            lastName: 'TALON',
            firstName: 'Alyce',
            birthDate: '1992-07-26',
            address: '3 Rue Henri Hure 49300 Cholet',
            phone: '0777777777',
            email: 'talonalyce@gmail.com'
          }
        })
        done()
      })
  })
  it('PUT /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
      .put('/users/1111111111111')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'User 1111111111111 not found'
        })
        done()
      })
  })

  it('DELETE /users/:id should return a success response', function (done) {
    chai.request(api)
      .delete('/users/1281464365499')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          meta: {
            _deleted: {
              id: '1281464365499',
              lastName: 'CADIEUX',
              firstName: 'Marius',
              birthDate: '1985-10-27',
              address: '3 Rue Henri Hure 49300 Cholet',
              phone: '0666666666',
              email: 'mariuscadieux@gmail.com'
            }
          }
        })
        done()
      })
  })
  it('DELETE /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
      .delete('/users/1111111111111')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'User 1111111111111 not found'
        })
        done()
      })
  })
})
