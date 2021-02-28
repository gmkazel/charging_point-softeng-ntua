const common = require('../../common')

const chai = common.chai
const server = common.server
const config = common.config

it('it should create a user', (done) => {
  const user = {
    username: 'Goodwin_Rylee',
    password: 'EPw3mFPQwP8auVc'
  }
  chai.request(server)
    .post(config.BASE_URL + '/admin/')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(user)
    .end((err, res) => {
      if (err) {
        done(err)
      }
      console.log(res.header)
      res.should.have.status(200)
      // res.body.should.be.a.String()
      done()
    })
})
