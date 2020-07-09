const Twit = require('twit');
const config = require('./config.js');

const TWITTER = new Twit(config);

TWITTER.post('statuses/update', { status: 'Hello, world!' }, (err, data, response) => {
  if (err) {
    console.error(err);
  }

  console.log(data);
})
