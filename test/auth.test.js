/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const { User } = require('../src/models');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const testAccount = {
  username: 'aaaaaaaaaaaa',
  password: 'password',
  _id: 'aaaaaaaaaaaa'
};

const usernameDNE = {
  username: 'nope',
  password: 'password'
};

const passwordDNE = {
  username: 'aaaaaaaaaaaa',
  password: 'nope'
};

describe('Auth Tests', function () {
  const agent = chai.request.agent(app);

  before(function (done) {
    const user = new User(testAccount);
    user.save((err) => {
      if (err) { done(err); } else { done(); }
    });
  });

  after(function () {
    agent.close();
  });

  after(function (done) {
    User.deleteOne({ _id: 'aaaaaaaaaaaa' }, (err) => {
      if (err) { done(err); } else { done(); }
    });
  });

  it('Should have a homepage', (done) => {
    agent.get('/')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        return done();
      });
  });

  it('Should log in with valid account', function (done) {
    agent.post('/login')
      .send(testAccount)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        agent.should.have.cookie('nToken');
        return done();
      });
  });

  it('Should remove JWT cookie when logging out', function (done) {
    agent.get('/logout')
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        agent.should.not.have.cookie('nToken');
        return done();
      });
  });

  it('Should not log in with non-existent account', function (done) {
    agent.post('/login')
      .send(usernameDNE)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(404);
        return done();
      });
  });

  it('Should not log in with incorrect password', function (done) {
    agent.post('/login')
      .send(passwordDNE)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(401);
        return done();
      });
  });
});
