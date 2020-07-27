import Twit from 'twit';
import { TWKEYS, TWHANDLE } from './config';
import buildAnswer from './answer';

const TWITTER = new Twit(TWKEYS);

async function receiveMentionEvent(tweet) {
  const tweetText = tweet.text.replace(TWHANDLE, '').trim();
  const idToReply = tweet.id_str;

  const reply = await buildAnswer(tweetText);

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
