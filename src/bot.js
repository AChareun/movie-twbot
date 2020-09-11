require('dotenv').config();
const Twit = require('twit');

const { TWKEYS, TWHANDLE } = require('./config');
const configureDependencyInjection = require('./config/di');
const cleanString = require('./utils/string-manipulation');

const TWBOT = new Twit(TWKEYS);

const container = configureDependencyInjection();
const answerService = container.get('AnswerService');

async function receiveMentionEvent(tweet) {
  const tweetText = cleanString(tweet.text, TWHANDLE);
  const idToReply = tweet.id_str;

  const reply = await answerService.getAnswer(tweetText);

  const params = {
    status: reply,
    in_reply_to_status_id: idToReply,
  };

  TWBOT.post('statuses/update', params, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Tweeted: ${params.status}`);
    }
  });
}

const mentionStream = TWBOT.stream('statuses/filter', {
  track: [TWHANDLE],
});
mentionStream.on('tweet', receiveMentionEvent);
