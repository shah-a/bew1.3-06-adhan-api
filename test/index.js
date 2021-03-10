const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('API Tests', () => {
  const agent = chai.request.agent(app);

  after((done) => {
    agent.close();
    done();
  });

  it('Should have a homepage', (done) => {
    agent
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        return done();
      });
  });
});
