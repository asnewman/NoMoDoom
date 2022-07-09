import log from "../../helpers/logger";
import { Item, MongoUser, MONGO_TYPES } from "../../mongoose";
import { saveEmailObjects, emailUsers } from "./email";

async function prepareEmailController(_req: any, res: any) {
  await log("info", `Starting emailing`);
  try {
    const users: MongoUser[] = await Item.find({
      type: MONGO_TYPES.USER,
    });

    const promises: Promise<any>[] = [];
    users.forEach((user) => {
      promises.push(saveEmailObjects(user.data.email));
    });

    await Promise.all(promises);

    await log("info", `Finished creating and email objects`);

    res.send("Success");
  } catch (e) {
    await log("error", e);
    res.status(400).send(`Error archiving: ${e}`);
  }
}

async function sendEmailController(_req: any, res: any) {
  await log("info", `Starting emailing`);
  try {
    await emailUsers();

    await log("info", `Finished emailing`);

    res.send("Success");
  } catch (e) {
    await log("error", e);
    res.status(400).send(`Error archiving: ${e}`);
  }
}

export default prepareEmailController;

export { sendEmailController, prepareEmailController };
