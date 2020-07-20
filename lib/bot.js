"use strict";

var _twit = _interopRequireDefault(require("twit"));

var _config = require("./config");

var _answer = _interopRequireDefault(require("./answer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TWITTER = new _twit.default(_config.TWKEYS);
const mentionStream = TWITTER.stream("statuses/filter", {
  track: ["@MovieDispenser"]
});
mentionStream.on("tweet", receiveMentionEvent);

async function receiveMentionEvent(tweet) {
  const userToReply = tweet.user.screen_name;
  const tweetText = tweet.text.replace(/@MovieDispenser/g, "").trim();
  const idToReply = tweet.id_str;
  const reply = await (0, _answer.default)(tweetText);
  const params = {
    status: reply,
    in_reply_to_status_id: idToReply
  };
  TWITTER.post("statuses/update", params, function (err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Tweeted: " + params.status);
    }
  });
}