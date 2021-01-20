require('dotenv').config();
import Twit = require('twit');

import { AnswerService } from './module/answer/service/answerService';
import { TWKEYS, TWHANDLE } from './config/config';
import { configureDI } from './config/di';
import { cleanString } from './utils/string-manipulation';

const { consumer_key, consumer_secret, access_token, access_token_secret } = TWKEYS;

const TWBOT = new Twit({
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret
});

const container = configureDI();
const answerService = container.get<AnswerService>('AnswerService');

async function receiveMentionEvent(tweet: any): Promise<void> {
    const tweetText: string = cleanString(tweet.text, TWHANDLE);
    const idToReply: string = tweet.id_str;

    const reply: string = await answerService.getAnswer(tweetText);

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

const mentionStream: Twit.Stream = TWBOT.stream('statuses/filter', {
    track: [TWHANDLE],
});
mentionStream.on('tweet', receiveMentionEvent);
