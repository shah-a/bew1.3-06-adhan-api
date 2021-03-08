const app = require('../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('API Tests', function () {
  const agent = chai.request.agent(app);

  after(function (done) {
    agent.close();
    done();
  });

  it("Should have a homepage", function (done) {
    agent
      .get('/')
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});
