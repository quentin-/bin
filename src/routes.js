const Bin = require('./model/bin');

const routes = (app) => {
  app.get('/v1/bins/:uid', (req, res) => {
    new Bin(req.params.uid).getRequests((err, requests) => {
      res.send({
        uid: req.params.uid,
        requests: requests
      });
    });
  });

  app.post('/v1/bins/:uid/reply', (req, res) => {
    const status = req.body ? req.body.status : 200;
    const body = req.body ? req.body.body : {};

    new Bin(req.params.uid).setResponse(status, body, (err) => {
      res.send({});
    });
  });

  const binHandler = (req, res) => {
    const bin = new Bin(req.params.uid);
    bin.addRequest(req);
    bin.getResponse((err, response) => {
      res.status(response ? response.status : 200);
      res.send(response ? response.body : {});
    });
  };

  app.get('/bins/:uid', binHandler);
  app.post('/bins/:uid', binHandler);
  app.patch('/bins/:uid', binHandler);
  app.delete('/bins/:uid', binHandler);
};

module.exports = routes;
