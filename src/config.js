const { TWHANDLE } = process.env;

const TWKEYS = {
  consumer_key: process.env.API_CONSUMER_KEY,
  consumer_secret: process.env.API_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
};

const TMDBKEYS = {
  API_KEY: process.env.API_KEY,
  READ_TOKEN: process.env.READ_TOKEN,
};

module.exports = { TWHANDLE, TWKEYS, TMDBKEYS };
