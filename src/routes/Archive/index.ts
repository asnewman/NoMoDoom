import log from "../../helpers/logger";
import { Item, MongoSubscription, MONGO_TYPES } from "../../mongoose";
import archiveHackernews from "./archivers/hackernews";
import archiveSubreddit from "./archivers/subreddit";
import { archiveSubscriptions } from "./pure";

async function archiveController(_req: any, res: any) {
  await log("info", `Starting archiving`);
  try {
    const subscriptions: MongoSubscription[] = await Item.find({
      type: MONGO_TYPES.SUBSCRIPTION,
    });

    await archiveSubscriptions(
      subscriptions,
      archiveSubreddit,
      archiveHackernews
    );

    await log("info", "Archiving completed");

    res.send("Success");
  } catch (e) {
    await log("error", e);
    res.status(400).send(`Error archiving: ${e}`);
  }
}

export default archiveController;
