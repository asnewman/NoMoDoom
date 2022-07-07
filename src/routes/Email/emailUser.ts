import nodemailer from "nodemailer";
import {
  Item,
  MongoArchive,
  MongoEmail,
  MongoSubscription,
  MONGO_TYPES,
} from "../../mongoose";
import moment from "moment-timezone";
import {
  generateHackernewsHtml,
  generateRedditHtml,
} from "./pure/emailHtmlGenerators";
import log from "../../helpers/logger";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function emailUser(email: string) {
  const user = await Item.findOne({
    "data.email": email,
  });

  if (!user) {
    await log("error", `Email not found: ${email}`);
    return;
  }

  const subscriptions: MongoSubscription[] = await Item.find({
    type: MONGO_TYPES.SUBSCRIPTION,
    "data.email": email,
    "data.service": { $ne: "nomodoom" }
  });

  if (subscriptions.length === 0) {
    return;
  }

  const subreddits: string[] = subscriptions
    .filter((subscription) => subscription.data.service === "reddit")
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
  });

  const hackernewsData = (
    await Item.find({
      type: MONGO_TYPES.ARCHIVE,
      "data.type": "hackernews",
    })
      .sort({ "data.datetime": -1 })
      .limit(1)
  )[0];

  let emailText = "Here is your nomodoom email digest:<br/><br/>";

  if (subredditData.length > 0) {
    emailText += generateRedditHtml(subredditData, false);
  }

  const isSubscribedToHackernews = subscriptions.find(
    (subscription) => subscription.data.service === "hackernews"
  );
  if (isSubscribedToHackernews) {
    emailText += generateHackernewsHtml(hackernewsData);
  }

  emailText += `<p>Adjust your email settings at <a href="https://nomodoom.com">nomodoom.com</a></p>`;

  await transporter.sendMail({
    from: '"nomodoom" <robot@nomodoom.com>', // sender address
    to: email,
    subject: `nomodoom digest ${moment()
      .tz("America/Los_Angeles")
      .format("MMMM Do YYYY")}`, // Subject line
    html: emailText,
  });

  await log("info", `Email sent to ${email}`);

  const mongoEmail: MongoEmail = {
    type: "EMAIL",
    data: {
      email,
      content: emailText,
      datetime: Date.now(),
    },
  };

  await Item.create(mongoEmail);

  user.data.lastSent = Date.now();
  user.markModified("data");
  await user.save();
}

export default emailUser;
