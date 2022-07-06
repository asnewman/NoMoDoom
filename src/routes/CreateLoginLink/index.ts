import nodemailer from "nodemailer";
import {
  Item,
  MongoSubscription,
  MongoUser,
  MONGO_TYPES,
} from "../../mongoose";
import randomString from "../../helpers/randomString";
import log from "../../helpers/logger";
import { sendPushover } from "../../helpers/pushover";

async function createLoginLinkController(req: any, res: any) {
  try {
    const email = req.body.email.toLowerCase();
    let user = await Item.findOne({
      type: MONGO_TYPES.USER,
      "data.email": email,
    });

    if (!user) {
      const mongoUser: MongoUser = {
        type: MONGO_TYPES.USER,
        data: {
          email,
          signedInWithToken: false,
          token: "",
          tokenExpiration: 0,
          frequency: 1,
          lastSent: 0,
          isPremium: false,
        },
      };
      user = new Item(mongoUser);

      await log("info", "New user signed up! " + email);
      await sendPushover(`New user signed up! ${email}`);

      const nomodoomSubscription: MongoSubscription = {
        type: MONGO_TYPES.SUBSCRIPTION,
        data: {
          service: "nomodoom",
          email,
        },
      };

      await Item.create(nomodoomSubscription);
    }

    user.data.token = randomString(20);
    (user.data.tokenExpiration = Date.now() + 7200000),
      (user.data.signedInWithToken = false);
    user.markModified("data");
    await user.save();

    if (process.env.IS_LOCAL === "true") {
      await log("info", "bypassing auth");
      user.data.signedInWithToken = true;
      user.data.token = randomString(20);
      user.markModified("data");
      await user.save();
      res.cookie("token", user.data.token);
      return res.redirect("/");
    } else {
      await sendMail(email, user.data.token);
      return res.send("Success - please check your email");
    }
  } catch (e) {
    await log("error", e);
    res.send("Failed");
  }
}

async function sendMail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"nomodoom" <ash@kozukaihabit.com>', // sender address
    to: email,
    subject: "Login link", // Subject line
    text: `Use this link to login in: ${process.env.BASE_URL}/login?token=${token}. Don't share this link with anyone.`,
  });
}

export default createLoginLinkController;
