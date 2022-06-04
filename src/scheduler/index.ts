import cron from "node-cron";
import { getChannel } from "../amqp";
import { Item, MONGO_TYPES } from "../mongoose";
import { generateArchiveEvents, generateEmailEvents } from "./pure";

function start() {
  if (process.env.IS_LOCAL !== "true") {
    cron.schedule(process.env.ARCHIVE_CRON || "", () => {
      sendArchivingEvents();
    }, { timezone: "America/Los_Angeles" });
    cron.schedule(process.env.EMAIL_CRON || "", () => {
      sendEmailEvents();
    }, { timezone: "America/Los_Angeles" });
  }
}

function sendArchivingEvents() {
  getChannel().then(async (channel) => {
    const subscriptions = await Item.find({ type: MONGO_TYPES.SUBSCRIPTION });
    generateArchiveEvents(subscriptions).forEach((eventData) => {
      channel.sendToQueue("archive", Buffer.from(JSON.stringify(eventData)));
    });
  });
}

function sendEmailEvents() {
  getChannel().then(async (channel) => {
    const users = await Item.find({ type: MONGO_TYPES.USER });
    generateEmailEvents(users, Date.now()).forEach((emailData) => {
      channel.sendToQueue("email", Buffer.from(JSON.stringify(emailData)));
    });
  });
}

export default start;
