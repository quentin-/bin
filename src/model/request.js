class Request {
  constructor(req) {
    return {
      url: req.url,
      body: req.body,
      query: req.query,
      headers: req.headers,
      method: req.method,
      created_at: new Date(),
      ip: req.connection.remoteAddress
    };
  }
}

module.exports = Request;
