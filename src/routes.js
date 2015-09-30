const Bin = require('./model/bin');

const routes = (app) => {
  app.get('/v1/creels/:uid', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    new Bin(req.params.uid).getRequests((err, requests) => {
      res.send({
        uid: req.params.uid,
        requests: requests
      });
    });
  });

  const binHandler = (req, res) => {
    new Bin(req.params.uid).addRequest(req);
    res.send({});
  }

  app.get('/creels/:uid', binHandler);
  app.post('/creels/:uid', binHandler);
  app.patch('/creels/:uid', binHandler);
  app.delete('/creels/:uid', binHandler);
}

module.exports = routes;
