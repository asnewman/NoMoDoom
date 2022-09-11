import { MongoSubscription, MongoUser } from "../../../mongoose";

const generateRedditPageData = async (
  email: string,
  getUser: (email: string) => Promise<MongoUser | undefined>,
  getRedditSubscriptions: (email: string) => Promise<MongoSubscription[]>,
): Promise<{ email: string; subreddits: string[] }> => {
  const user = await getUser(email);

  if (!user) {
    throw Error(`User not found (${email}). Cannot generate Reddit page.`);
  }

  const subscriptions = await getRedditSubscriptions(user.data.email);

  return {
    email,
    subreddits: subscriptions.map(
      (s: MongoSubscription) => s.data.subservice || "unknown subreddit"
    ),
  };
};

export default generateRedditPageData;
