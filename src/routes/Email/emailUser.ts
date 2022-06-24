import nodemailer from "nodemailer";
import { Item, MongoArchive, MongoSubscription, MONGO_TYPES } from "../../mongoose";
import moment from "moment-timezone";
import {generateHackernewsHtml, generateRedditHtml} from "./pure/emailHtmlGenerators";

async function emailUser(email: string) {
  const user = await Item.findOne({
    "data.email": email,
  });

  if (!user) {
    console.error("Email not found: ", email);
    return;
  }

  const subscriptions: MongoSubscription[] =
    await Item.find({
      type: MONGO_TYPES.SUBSCRIPTION,
      "data.email": email,
    });

  if (subscriptions.length === 0) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subreddits: string[] = 
    subscriptions.filter(subscription => subscription.data.service === "reddit")
    .map((subscription) => subscription.data.subservice)
    .filter((subservice) => subservice !== undefined) as string[];

  const subredditData: MongoArchive[] = await Item.find({
        type: MONGO_TYPES.ARCHIVE,
        "data.type": "subreddit",
        "data.datetime": {
          $gt: user.data.lastSent,
        },
        "data.subreddit": {
          $in: subreddits,
        },
      })
 
  const hackernewsData =  await Item.findOne({
        type: MONGO_TYPES.ARCHIVE,
        "data.type": "hackernews",
        "data.datetime": {
          $gt: user.data.lastSent,
        }
      })


  let emailText = "Here is your nomodoom email digest:<br/><br/>";

  if (subredditData.length > 0) {
    emailText += generateRedditHtml(subredditData)
  }
  
  const isSubscribedToHackernews = subscriptions
    .find(subscription => subscription.data.service === "hackernews")
  if (isSubscribedToHackernews) {
    emailText += generateHackernewsHtml(hackernewsData);
  }

  await transporter.sendMail({
    from: '"nomodoom" <ash@kozukaihabit.com>', // sender address
    to: email,
    subject: `nomodoom digest ${moment()
      .tz("America/Los_Angeles")
      .format("MMMM Do YYYY")}`, // Subject line
    html: emailText,
  });

  user.data.lastSent = Date.now();
  user.markModified("data");
  await user.save();
}

export default emailUser;
