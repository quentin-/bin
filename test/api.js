const redis = require('../src/lib/redis.js');
const superagent = require('superagent');
const assert = require('assert');

const docker_host = process.env.DOCKER_MACHINE_IP;
const port = process.env.port || 8080;
const host = 'http://' + (docker_host || 'localhost') +  ':' + port;

describe('v1/bins/abc', () => {
  before(() => redis.flushall());

  it('return no requests', done => {
    superagent
      .get(host + '/v1/bins/123')
      .end((err, res) => {
        assert.equal(res.body.uid, 123);
        assert.equal(res.body.requests.length, 0);
        done();
      });
  });

  context('when some requests were received', () => {
    before(done => {
      superagent
        .get(host + '/bins/123?foo=bar')
        .end(() => {
          done();
        });
    });

    it('return the requests', done => {
      superagent
        .get(host + '/v1/bins/123')
        .end(function(err, res) {
          assert.equal(res.body.uid, 123);
          assert.equal(res.body.requests.length, 1);
          assert.equal(res.body.requests[0].query.foo, 'bar');
          done();
        });
    });
  });
});

describe('v1/bins/abc/reply', () => {
  before(() => redis.flushall());

  context('I set the bin response to 404', () => {
    before(done => {
      superagent
        .post(host + '/v1/bins/123/reply')
        .type('json')
        .send({status: 404, body: {foo: 'not found'}})
        .end(() => {
          done();
        });
    });

    it('returns 404', done => {
      superagent
        .get(host + '/bins/123')
        .end(function(err, res) {
          assert.equal(res.body.foo, 'not found');
          assert.equal(res.status, 404);
          done();
        });
    });
  });
});
