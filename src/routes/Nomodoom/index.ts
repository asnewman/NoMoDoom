import log from "../../helpers/logger";
import { Item, MONGO_TYPES } from "../../mongoose";

async function nomodoomController(req: any, res: any) {
  try {
    const subscription = await Item.findOne({
      type: MONGO_TYPES.SUBSCRIPTION,
      "data.email": req.email,
      "data.service": "nomodoom",
    });
    return res.render("Nomodoom", {
      email: req.email,
      isSubscribed: Boolean(subscription),
    });
  } catch (e) {
    await log("error", e);
    return res.send(e);
  }
}

export default nomodoomController;
