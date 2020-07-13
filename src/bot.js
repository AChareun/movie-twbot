import Twit from "twit";
import { TWKEYS } from "./config";
import requestMovie from "./api/get-data";

const TWITTER = new Twit(TWKEYS);

const mentionStream = TWITTER.stream("statuses/filter", {
  track: ["@MovieDispenser"],
});
mentionStream.on("tweet", receiveMentionEvent);

async function receiveMentionEvent(tweet) {
  const userToReply = tweet.user.screen_name;
  const tweetText = tweet.text.replace(/@MovieDispenser/g, "");
  const idToReply = tweet.id_str;

  const randomMovie = await requestMovie();

  const reply = `Hi, here's a random movie for you :)
${randomMovie.original_title}, ${randomMovie.release_date}.
Duration: ${randomMovie.runtime} mins`;

  const params = {
    status: reply,
    in_reply_to_status_id: idToReply,
  };

  TWITTER.post("statuses/update", params, function (err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Tweeted: " + params.status);
    }
  });
}
