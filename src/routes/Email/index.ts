import { Item, MongoUserData, MONGO_TYPES } from "../../mongoose";
import emailUser from "./emailUser";

async function emailController(_req: any, res: any) {
  try {
    const users: { type: string, data: MongoUserData}[] = await Item.find({ type: MONGO_TYPES.USER });

    const promises: Promise<any>[] = [];
    users.forEach(user => {
      promises.push(emailUser(user.data.email));
    })

    await Promise.all(promises);

    res.send("Success")
  }
  catch(e) {
    res.status(400).send(`Error archiving: ${e}`)
  }
}

export default emailController;
