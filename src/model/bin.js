const redis = require('../lib/redis.js');
const pusher = require('../lib/pusher.js');
const Request = require('./request.js');

class Bin {
  constructor(uid) {
    this.uid = uid;
  }

  getRequests(callback) {
    redis.lrange(this.uid, 0, -1, (err, response) => {
      const requests = response.map(req => JSON.parse(req));
      callback(err, requests);
    });
  }

  getChannel() {
    return this.uid;
  }

  setResponse(status, body, callback) {
    const response = {status: status, body: body};
    redis.set('response_' + this.uid, JSON.stringify(response), (err) => {
      callback(err);
    });
  }

  getResponse(callback) {
    redis.get('response_' + this.uid, (err, resp) => {
      callback(err, JSON.parse(resp));
    });
  }

  addRequest(req) {
    const request = new Request(req);
    redis.lpush(this.uid, JSON.stringify(request));
    pusher.trigger(this.getChannel(), 'new_request', {
      uid: this.uid,
      request: request
    });
  }
}

module.exports = Bin;
