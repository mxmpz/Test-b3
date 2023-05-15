import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('Chez moi ça marche', function () {
  it('should return a success response', function (done) {
    chai.request('http://www.chezmoicamarche.fr')
      .get('/')
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200)
        done()
      })
  })
})
