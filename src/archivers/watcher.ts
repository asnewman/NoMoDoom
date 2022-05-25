import archiveSubreddit from "./subreddit";
import { getChannel } from "../amqp";

export default function start() {
getChannel().then(async (channel) => {
  await channel.consume("archive", (msg) => {
    const rawMsg = msg?.content.toString();
    const msgObj: any = JSON.parse(rawMsg || "");
    if (msg && msgObj.service === "reddit") {
      console.log("Message to archive subreddit: " + msgObj.subservice);
      archiveSubreddit(msgObj.subservice).then(() => {
        channel.ack(msg);
      });
    }
  });
});
}