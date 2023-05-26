import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)

describe('Bookings', function () {
  it('GET /bookings should return a success response with all bookings', function (done) {
    chai.request(api)
      .get('/bookings')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: [
            {
              id: '7894561233166',
              rentDate: '2023-02-28',
              returnDate: '2023-03-06',
              book: 'Livre1',
              user: '5643431345887'
            },
            {
              id: '4494125435659',
              rentDate: '2022-11-17',
              returnDate: '2022-11-24',
              book: 'Livre2',
              user: '5643431345887'
            }
          ]
        })
        done()
      })
  })

  it('POST /bookings should create the booking and return a success response with the booking', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    chai.request(api)
      .post('/bookings')
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(201)
        chai.expect(res.body).to.deep.equal({
          data: booking
        })
        done()
      })
  })

  it('POST /bookings should return a bad request if rentDate malformed', function (done) {
    const bookings = {
      id: '5749461811651',
      rentDate: '20221007',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    if (Date.parse(bookings.rentDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .post('/bookings')
        .send(bookings)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Rent Date of booking is malformed'
          })
          done()
        })
    }
  })

  it('POST /bookings should return a bad request if returnDate malformed', function (done) {
    const bookings = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '20221016',
      book: 'Livre3',
      user: '1281464365499'
    }
    if (Date.parse(bookings.returnDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .post('/bookings')
        .send(bookings)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'RenturnDate of booking is malformed'
          })
          done()
        })
    }
  })

  it('POST /bookings should return a bad request if book not found', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'AAAAAAAAAAAAAAAAAAAAAAA',
      user: '1281464365499'
    }
    chai.request(api)
      .post('/bookings')
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'Book of booking not found'
        })
        done()
      })
  })

  it('POST /bookings should return a bad request if user not found', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1111111111111'
    }
    chai.request(api)
      .post('/bookings')
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: 'User of booking not found'
        })
        done()
      })
  })

  it('GET /bookings/:id should return a success response with found booking', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    chai.request(api)
      .get(`/bookings/${booking.id}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: booking
        })
        done()
      })
  })

  it('GET /bookings/:id should return not found response if the booking does not exists', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    const fakeId = '1111111111111'
    chai.request(api)
      .get(`/bookings/${fakeId}`)
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Booking ${fakeId} not found`
        })
        done()
      })
  })

  it('PUT /bookings/:id should return a success response with found booking', function (done) {
    const booking = {
      id: '7984613166494',
      rentDate: '2023-01-10',
      returnDate: '2023-01-20',
      book: 'Nomdulivre',
      user: '1281464365499'
    }
    chai.request(api)
      .put(`/bookings/${booking.id}`)
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          data: booking
        })
        done()
      })
  })

  it('PUT /bookings/:id should return not found response if the booking does not exists', function (done) {
    const booking = {
      id: '7984613166494',
      rentDate: '2023-01-10',
      returnDate: '2023-01-20',
      book: 'Nomdulivre',
      user: '1281464365499'
    }
    const fakeId = '222222222222'
    chai.request(api)
      .put(`/bookings/${fakeId}`)
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Booking ${fakeId} not found`
        })
        done()
      })
  })

  it('PUT /bookings/:id should return a bad request if rentDate malformed', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '20221007',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    if (Date.parse(booking.rentDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .put(`/bookings/${booking.id}`)
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `Rent Date of ${booking.id} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /bookings/:id should return a bad request if returnDate malformed', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '20221016',
      book: 'Livre3',
      user: '1281464365499'
    }
    if (Date.parse(booking.returnDate)) {
      console.log('ok')
    } else {
      chai.request(api)
        .put(`/bookings/${booking.id}`)
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: `RenturnDate of ${booking.id} is malformed`
          })
          done()
        })
    }
  })

  it('PUT /bookings/:id should return a bad request if book not found', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    const fakeNameBook = 'AAAAAAAAAAAAAAAAAAAAAAA'
    chai.request(api)
      .put(`/bookings/${booking.id}`)
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Book ${fakeNameBook} of booking not found`
        })
        done()
      })
  })

  it('PUT /bookings/:id should return a bad request if user not found', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499'
    }
    const fakeUserId = '1111111111111'
    chai.request(api)
      .put(`/bookings/${booking.id}`)
      .send(booking)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `User ${fakeUserId} of booking not found`
        })
        done()
      })
  })

  it('DELETE /bookings/:id should return a success response', function (done) {
    const bookingsDeleteId = '4494125435659'
    chai.request(api)
      .delete(`/bookings/${bookingsDeleteId}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        chai.expect(res.body).to.deep.equal({
          meta: {
            _deleted: {
              id: '4494125435659',
              rentDate: '2022-11-17',
              returnDate: '2022-11-24',
              book: 'Livre2',
              user: '5643431345887'
            }
          }
        })
        done()
      })
  })

  it('DELETE /bookings/:id should return not found response if the booking does not exists', function (done) {
    const idError = '1234567899999'
    chai.request(api)
      .delete(`/bookings/${idError}`)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404)
        chai.expect(res.body).to.deep.equal({
          error: `Booking ${idError} not found`
        })
        done()
      })
  })
})
