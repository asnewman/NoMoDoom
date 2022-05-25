import { MongoSubscriptionData, MongoUserData } from "../../mongoose";
import { ArchiveEvent, EmailEvent } from "../eventTypes";

function generateArchiveEvents(
  subscriptions: { type: string; data: MongoSubscriptionData }[]
) {
  const res: ArchiveEvent[] = [];

  const subreddits = subscriptions.map((subscription) => {
    return subscription.data.subservice;
  });
  const uniqueSubreddits = new Set(subreddits);
  uniqueSubreddits.forEach((subreddit) => {
    if (subreddit) {
      const eventData: ArchiveEvent = {
        service: "reddit",
        subservice: subreddit,
      };

      res.push(eventData);
    }
  });

  return res;
}

function generateEmailEvents(
  users: { type: string; data: MongoUserData }[],
  currentTime: number
) {
  const res: EmailEvent[] = [];

  users.forEach((user) => {
    const nextSendTime = user.data.lastSent + user.data.frequency * 8600000;
    if (nextSendTime <= currentTime) {
      res.push({ email: user.data.email });
    }
  });

  return res;
}

export { generateArchiveEvents, generateEmailEvents };
