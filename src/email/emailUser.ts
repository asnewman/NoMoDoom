import nodemailer from "nodemailer";
import {
  Item,
  MONGO_TYPES,
  MongoSubscriptionData,
} from "../mongoose";
import { generateEmailData } from "./pure";

async function emailUser(email: string) {
  const user = await Item.findOne(
    {
      "data.email": email,
    }
  );

  if (!user) {
    console.error("Email not found: ", email);
    return;
  }

  const subscriptions: { type: string; data: MongoSubscriptionData }[] =
    await Item.find({
      type: MONGO_TYPES.SUBSCRIPTION,
      "data.email": email,
    });

  const emailData = await generateEmailData(
    user,
    subscriptions,
    async (subreddits: string[], gtTimestamp: number) => {
      return Item.find({
        type: MONGO_TYPES.SUBREDDIT,
        "data.datetime": {
          $gt: gtTimestamp,
        },
        "data.subreddit": {
          $in: subreddits,
        },
      });
    }
  );

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  let emailText = "Here is your nomodoom email digest:<br/><br/>"
  emailData.subreddits.forEach(subreddit => {
    emailText += `<b>/r/${subreddit.name}:</b><br/><hr/>"`
    subreddit.posts.forEach((post) => {
      emailText += `<b>${post.title}</b><br/>`
      emailText += `<a href=${post.url}>Link</a><br/>`
      emailText += `Score: ${post.score}<br/>`
    });
    emailText += "</br>"
  });

  await transporter.sendMail({
    from: '"nomodoom" <ash@kozukaihabit.com>', // sender address
    to: email,
    subject: "nomodoom digest", // Subject line
    html: emailText
  });

  user.data.lastSent = Date.now();
  user.markModified("data");
  await user.save()
}

export default emailUser;
