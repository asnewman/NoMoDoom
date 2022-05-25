import randomString from "../../helpers/randomString";
import { Item, MongoUserData, MONGO_TYPES } from "../../mongoose";

async function loginController(req: any, res: any) {
  try {
    const { token } = req.query;
    const user = await Item.findOne({
      type: MONGO_TYPES.USER,
      "data.token": token,
    });

    if (!user) return res.send("Failed - auth token not found");

    const userData: MongoUserData = user.data;

    if (userData.signedInWithToken || Date.now() > userData.tokenExpiration) {
      return res.send("Failed - invalid auth token");
    }

    user.data.signedInWithToken = true;
    user.data.token = randomString(20);
    user.markModified("data");
    await user.save();
    res.cookie("token", user.data.token);
    return res.redirect("/");
  } catch (e) {
    console.error(e);
    return res.send("Failed");
  }
}

export default loginController;
