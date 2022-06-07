import { Item, MONGO_TYPES } from "../mongoose";

export default async function (req: any, res: any, next: any) {
  const { token } = req.cookies;
  const user = await Item.findOne({
    type: MONGO_TYPES.USER,
    "data.token": token,
  });
  
  if (user && user.data.tokenExpiration > Date.now()) {
    req.email = user.data.email;
    next();
  } else {
    return res.redirect("/create-link");
  }
}
