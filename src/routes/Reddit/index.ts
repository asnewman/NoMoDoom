import { Item, MongoSubscription, MONGO_TYPES } from "../../mongoose";

async function redditController(req: any, res: any) {
  try {
    const subscriptions = await Item.find({
      type: MONGO_TYPES.SUBSCRIPTION,
      "data.email": req.email,
      "data.service": "reddit",
    });

    return res.render("Reddit", {
      email: req.email,
      subreddits: subscriptions.map(
        (s: MongoSubscription) => s.data.subservice
      ),
    });
  } catch (e) {
    console.error(e);
    return res.send(e);
  }
}

export default redditController;
