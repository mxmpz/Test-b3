import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
describe('Bookingings', function () {
  it('GET /bookings should return a success response with all bookings', function (done) {
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            id: '7894561233166',
            rentDate: '2023-02-28',
            returnDate: '2023-03-06',
            book: 'Livre1',
            user: '5643431345887',
          },
          {
            id: '4494125435659',
            rentDate: '2022-11-17',
            returnDate: '2022-11-24',
            book: 'Livre2',
            user: '5643431345887',
          }
        ]
      });
      done();
    });
  });
  it('POST /bookings should create the booking and return a success response with the booking', function (done) {
    const booking = {
      id: '5749461811651',
      rentDate: '2022-10-07',
      returnDate: '2022-10-16',
      book: 'Livre3',
      user: '1281464365499',
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: booking
      });
      done();
    });
  });

  it('GET /bookings/:id should return a success response with found booking', function (done) {
    chai.request(api)
    .get('/bookings/1281464365499')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: '5749461811651',
          rentDate: '2022-10-07',
          returnDate: '2022-10-16',
          book: 'Livre3',
          user: '1281464365499',
        }
      });
      done();
    });
  });
  it('GET /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .get('/bookings/1111111111111')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 1111111111111 not found'
      });
      done();
    });
  });
  it('PUT /bookings/:id should return a success response with found booking', function (done) {
    const booking = {
      id: '7984613166494',
      rentDate: '2023-01-10',
      returnDate: '2023-01-20',
      book: 'Nomdulivre',
      user: '1281464365499',
    };
    chai.request(api)
    .put('/bookings/7984613166494')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: '7984613166494',
          rentDate: '2023-01-10',
          returnDate: '2023-02-19',
          book: 'Livre4',
          user: '1281464365499',
        }
      });
      done();
    });
  });
  it('PUT /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .put('/bookings/222222222222')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 222222222222 not found'
      });
      done();
    });
  });

  it('DELETE /bookings/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/bookings/4494125435659')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            id: '4494125435659',
            rentDate: '2022-11-17',
            returnDate: '2022-11-24',
            book: 'Livre2',
            user: '5643431345887',
          }
        }
      });
      done();
    });
  });
  it('DELETE /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .delete('/bookings/3333333333333')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking 3333333333333 not found'
      });
      done();
    });
  });
});