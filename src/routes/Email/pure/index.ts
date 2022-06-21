import {
  MongoArchive,
  MongoArchiveHackernewsData,
  MongoArchiveSubredditData,
  MongoSubscription,
  MongoUser,
  SubredditPost,
} from "../../../mongoose";

interface EmailData {
  email: string;
  subreddits: {
    name: string;
    posts: SubredditPost[];
  }[];
  hackernews: MongoArchiveHackernewsData | null
}

async function generateEmailData(
  user: MongoUser,
  subscriptions: MongoSubscription[],
  getSubredditArchives: (
    subreddits: string[],
    gtTimestamp: number
  ) => Promise<MongoArchive[]>,
  getHackernewsArchive: () => Promise<MongoArchive>
) {
  const res: EmailData = {
    email: user.data.email,
    subreddits: [],
    hackernews: null,
  };

  const subreddits: string[] = 
    subscriptions.filter(subscription => subscription.data.service === "reddit")
    .map((subscription) => subscription.data.subservice)
    .filter((subservice) => subservice !== undefined) as string[];

  const subredditArchives = await getSubredditArchives(subreddits, user.data.lastSent);

  subredditArchives.forEach((archive) => {
    const subredditData = (archive.data as MongoArchiveSubredditData)
    res.subreddits.push({
      name: subredditData.subreddit,
      posts: subredditData.topPosts,
    });
  });

  const isSubscribedToHackernews = subscriptions
    .find(subscription => subscription.data.service === "hackernews")

  if (isSubscribedToHackernews) {
    const hackernewsArchive = await getHackernewsArchive();
    res.hackernews = (hackernewsArchive.data as MongoArchiveHackernewsData);
  }

  return res;
}

export { generateEmailData };
