import { SubredditData } from "../../archivers/subreddit/types";
import {
  MongoSubredditData,
  MongoSubscriptionData,
  MongoUserData,
} from "../../mongoose";

interface EmailData {
  email: string;
  subreddits: {
    name: string;
    posts: SubredditData[];
  }[];
}

async function generateEmailData(
  user: { type: string; data: MongoUserData },
  subscriptions: { type: string; data: MongoSubscriptionData }[],
  getSubredditArchives: (
    subreddits: string[],
    gtTimestamp: number
  ) => Promise<{ type: string; data: MongoSubredditData }[]>
) {
  const subreddits: string[] = subscriptions
    .map((subscription) => subscription.data.subservice)
    .filter((subservice) => subservice !== undefined) as string[];

  const archives = await getSubredditArchives(subreddits, user.data.lastSent);

  const res: EmailData = {
    email: user.data.email,
    subreddits: [],
  };

  archives.forEach((archive) => {
    res.subreddits.push({
      name: archive.data.subreddit,
      posts: archive.data.topPosts,
    });
  });

  return res;
}

export { generateEmailData };
