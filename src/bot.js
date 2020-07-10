import Twit from 'twit';
import { TWKEYS } from './config';

const TWITTER = new Twit(TWKEYS);

const mentionStream = TWITTER.stream('statuses/filter', { track: ['@MovieDispenser'] });
mentionStream.on('tweet', receiveMentionEvent);

function receiveMentionEvent(tweet) {
   const userToReply = tweet.user.screen_name;
   const tweetText = tweet.text.replace(/@MovieDispenser/g, "");
   const idToReply  = tweet.id_str;

   const reply = 'Hi! :)';
   const params = {
     status: reply,
     in_reply_to_status_id: idToReply
    };

   TWITTER.post('statuses/update', params, function(err, data, response) {
     if (err) {
       console.log(err);
     } else {
       console.log('Tweeted: ' + params.status);
     }
   })
}
