import { Item, MongoSubscriptionData, MONGO_TYPES } from "../../mongoose";

async function itemCrudController(req: any, res: any) {
  try {
    const { query, data } = req.body;

    switch (query) {
      case "ADD_SUBREDDIT_SUBSCRIPTION": {
        const newSubscriptionItemData: MongoSubscriptionData = {
          service: "reddit",
          subservice: data.subreddit,
          email: req.email,
        };
        await new Item({
          type: MONGO_TYPES.SUBSCRIPTION,
          data: newSubscriptionItemData,
        }).save();
        return res.status(200).send();
      }
      case "REMOVE_SUBREDDIT_SUBSCRIPTION": {
        await Item.deleteOne({
          "data.email": req.email,
          "data.subservice": data.subreddit,
        });
        return res.status(200).send();
      }
      default:
        break;
    }
    return res.status(404).send("Query not found");
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
}

export default itemCrudController;
