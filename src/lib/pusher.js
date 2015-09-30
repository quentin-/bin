const Pusher = require('pusher');

var client = new Pusher({
  appId: process.env.PUSHER_APP,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  encrypted: true
});

module.exports = client;
