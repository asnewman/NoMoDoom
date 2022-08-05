import log from "../../helpers/logger";
import { Item, MONGO_TYPES } from "../../mongoose";
import generateRedditPageData from "./pure/generateRedditPageData";

async function redditController(req: any, res: any) {
  try {
    const getUser = async (email: string) => {
      return await Item.findOne({
        type: MONGO_TYPES.USER,
        "data.email": email,
      });
    };

    const getSubscriptions = async (email: string) => {
      return await Item.find({
        type: MONGO_TYPES.SUBSCRIPTION,
        "data.email": email,
        "data.service": "reddit",
      });
    };

    return res.render(
      "Reddit",
      await generateRedditPageData(
        req.email,
        getUser,
        getSubscriptions,
        Date.now()
      )
    );
  } catch (e) {
    await log("error", e);
    return res.send(e);
  }
}

export default redditController;
