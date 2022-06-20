import {
    HackerNewsArchiveData,
  MongoArchiveData,
  MongoSubredditData,
  MongoSubscriptionData,
  MongoUserData,
  SubredditPost,
} from "../../../mongoose";

interface EmailData {
  email: string;
  subreddits: {
    name: string;
    posts: SubredditPost[];
  }[];
  hackernews: HackerNewsArchiveData[]
}

async function generateEmailData(
  user: { type: string; data: MongoUserData },
  subscriptions: { type: string; data: MongoSubscriptionData }[],
  getSubredditArchives: (
    subreddits: string[],
    gtTimestamp: number
  ) => Promise<{ type: string; data: MongoSubredditData }[]>
  getHackernewsArchive: () => Promise<{ type: string, data: MongoArchiveData}>
) {
  const res: EmailData = {
    email: user.data.email,
    subreddits: [],
    hackernews: [],
  };

  const subreddits: string[] = 
    subscriptions.filter(subscription => subscription.data.service === "reddit")
    .map((subscription) => subscription.data.subservice)
    .filter((subservice) => subservice !== undefined) as string[];

  const subredditArchives = await getSubredditArchives(subreddits, user.data.lastSent);

  subredditArchives.forEach((archive) => {
    res.subreddits.push({
      name: archive.data.subreddit,
      posts: archive.data.topPosts,
    });
  });

  const isSubscribedToHackernews = subscriptions
    .find(subscription => subscription.data.service === "hackernews")

  if (isSubscribedToHackernews) {
    const hackernewsArchive = await getHackernewsArchive();
    res.hackernews = hackernewsArchive.data;
  }

  return res;
}

export { generateEmailData };
