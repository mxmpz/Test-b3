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

  it('POST /users should return a bad request if birthDate malformed', function (done) {
    const user = {
      id: uuid,
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '19920726',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@gmail.com'
    }
    if (Date.parse(user.birthDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .post('/users')
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Birth Date of User is malformed'
          })
          done()
        })
    }
  })

  it('POST /users should return a bad request if phone malformed', function (done) {
    const user = {
      id: uuid,
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '9999999999999999999',
      email: 'talonalyce@gmail.com'
    }
    if (user.phone.length !== 10 && typeof user.phone !== 'number') {
      chai.request(api)
        .post('/users')
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Phone of User is malformed'
          })
          done()
        })
    }
  })

  it('POST /users should return a bad request if email malformed', function (done) {
    const user = {
      id: uuid,
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@.com'
    }
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      chai.request(api)
        .post('/users')
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Email of User is malformed'
          })
          done()
        })
    }
  })

  it('GET /users/:id should return a success response with found user', function (done) {
    const user = {
      id: '1281464365499',
      lastName: 'CADIEUX',
      firstName: 'Marius',
      birthDate: '1985-10-27',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0666666666',
      email: 'mariuscadieux@gmail.com'
    }
    chai.request(api)
      .get(`/users/${user.id}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: user
        })
        done()
      })
  })

  it('GET /users/:id should return not found response if the user does not exists', function (done) {
    const user = {
      id: '1281464365499',
      lastName: 'CADIEUX',
      firstName: 'Marius',
      birthDate: '1985-10-27',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0666666666',
      email: 'mariuscadieux@gmail.com'
    }
    const fakeId = '5616849616598'
    chai.request(api)
      .get(`/users/${fakeId}`)
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `User ${fakeId} not found`
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
      .put(`/users/${user.id}`)
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: user
        })
        done()
      })
  })

  it('PUT /users/:id should return not found response if the user does not exists', function (done) {
    const user = {
      id: '5643431345887',
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@gmail.com'
    }
    const fakeId = '1111111111111'
    chai.request(api)
      .put(`/users/${fakeId}`)
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `User ${fakeId} not found`
        })
        done()
      })
  })

  it('PUT /users/:id should return a bad request if birthDate malformed', function (done) {
    const user = {
      id: '5643431345887',
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '19920726',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@gmail.com'
    }
    if (Date.parse(user.birthDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .put(`/users/${user.id}`)
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Birth Date of User ${user.id} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /users/:id should return a bad request if phone malformed', function (done) {
    const user = {
      id: '5643431345887',
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '9999999999999999999',
      email: 'talonalyce@gmail.com'
    }
    if (user.phone.length === 10 && typeof user.phone !== 'number') {
      console.log('ok')
    } else {
      chai.request(api)
        .put(`/users/${user.id}`)
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Phone of User ${user.id} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /users/:id should return a bad request if email malformed', function (done) {
    const user = {
      id: '5643431345887',
      lastName: 'TALON',
      firstName: 'Alyce',
      birthDate: '1992-07-26',
      address: '3 Rue Henri Hure 49300 Cholet',
      phone: '0777777777',
      email: 'talonalyce@.com'
    }
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      chai.request(api)
        .put(`/users/${user.id}`)
        .send(user)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Email of User ${user.id} is malformed`
          })
          done()
        })
    }
  })

  it('DELETE /users/:id should return a success response', function (done) {
    const userDeleteId = '1281464365499'
    chai.request(api)
      .delete(`/users/${userDeleteId}`)
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
    const fakeDeleteId = '1111111111111'
    chai.request(api)
      .delete(`/users/${fakeDeleteId}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `User ${fakeDeleteId} not found`
        })
        done()
      })
  })
})
