import { Item, MongoSubscriptionData, MONGO_TYPES } from "../mongoose";

async function homeController(req: any, res: any) {
  try {
    const subscriptions = await Item.find({
      type: MONGO_TYPES.SUBSCRIPTION,
      "data.email": req.email,
    });
    return res.render("Home", {
      email: req.email,
      subreddits: subscriptions.map(
        (s: { type: string; data: MongoSubscriptionData }) => s.data.subservice
      ),
    });
  }
  catch(e) {
    console.error(e);
    return res.send(e)
  }
}

export default homeController;
