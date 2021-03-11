/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');
const { User } = require('../src/models');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const testAccount = {
  username: 'aaaaaaaaaaaa',
  password: 'password',
  _id: 'aaaaaaaaaaaa'
};

// const usernameDNE = {
//   username: 'nope',
//   password: 'password'
// };

// const passwordDNE = {
//   username: 'aaaaaaaaaaaa',
//   password: 'nope'
// };

describe('User Tests', function () {
  const agent = chai.request.agent(app);

  after(function () {
    agent.close();
  });

  after(function (done) {
    User.deleteOne({ _id: 'aaaaaaaaaaaa' }, (err) => {
      if (err) { done(err); } else { done(); }
    });
  });

  it('Should add new user', function (done) {
    agent.post('/users')
      .send(testAccount)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.text.should.include('Successfully added account');
        return done();
      });
  });

  it('Should not add new user with existing username', function (done) {
    agent.post('/users')
      .send(testAccount)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.text.should.include('User validation failed');
        return done();
      });
  });
});
