import { Item, MongoSubscriptionData, MONGO_TYPES } from "../../mongoose";
import archiveSubreddit from "./archivers/subreddit";

async function archiveController(_req: any, res: any) {
  try {
    const subscriptions: { type: string, data: MongoSubscriptionData }[] = await Item.find({ type: MONGO_TYPES.SUBSCRIPTION });
    const promises: Promise<any>[] = []
    subscriptions.forEach((subscription) => {
        if (subscription.data.service === "reddit" && subscription.data.subservice) {
          promises.push(archiveSubreddit(subscription.data.subservice))
        }
    });

    await Promise.all(promises)

    res.send("Success")
  }
  catch(e) {
    res.status(400).send(`Error archiving: ${e}`)
  }
}

export default archiveController;
