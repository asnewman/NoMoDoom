import { Item, MongoSubscriptionData, MONGO_TYPES } from "../../mongoose";
import archiveSubreddit from "./archivers/subreddit";

async function archiveController(_req: any, res: any) {
  try {
    const subscriptions: { type: string; data: MongoSubscriptionData }[] =
      await Item.find({ type: MONGO_TYPES.SUBSCRIPTION });

    const promises: Promise<any>[] = [];

    const subreddits = subscriptions
      .filter((subscriptions) => subscriptions.data.service === "reddit" && subscriptions.data.subservice)
      .map((subscription) => subscription.data.subservice) as string[]
    const uniqueSubreddits = [...new Set(subreddits)]
    
    uniqueSubreddits.forEach((subreddit) => {
        if (subreddit) {
          promises.push(archiveSubreddit(subreddit));
        }
      });

    await Promise.all(promises);

    res.send("Success");
  } catch (e) {
    res.status(400).send(`Error archiving: ${e}`);
  }
}

export default archiveController;
