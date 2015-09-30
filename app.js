var app = require('express')();
var bodyParser = require("body-parser");

require('dotenv').load();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

require('./src/routes.js')(app);

module.exports = app.listen(process.env.PORT || 8080);
