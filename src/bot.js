const Twit = require('twit');
const { TWKEYS, TWHANDLE } = require('./config');
const configureDependencyInjection = require('./config/di');
const standarizeText = require('./utils/string-manipulation');

const TWITTER = new Twit(TWKEYS);

async function receiveMentionEvent(tweet) {
  const tweetText = tweet.text.replace(TWHANDLE, '').trim();
  const container = configureDependencyInjection(standarizeText(tweetText));

  const answerService = container.get('AnswerService');

  const idToReply = tweet.id_str;

  const reply = await answerService.getAnswer();

  const params = {
    status: reply,
    in_reply_to_status_id: idToReply,
  };

  TWITTER.post('statuses/update', params, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Tweeted: ${params.status}`);
    }
  });
}

const mentionStream = TWITTER.stream('statuses/filter', {
  track: [TWHANDLE],
});
mentionStream.on('tweet', receiveMentionEvent);
