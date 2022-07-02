import { MongoSubscription } from "../../../mongoose";

async function archiveSubscriptions(
  subscriptions: MongoSubscription[],
  archiveSubreddit: (subreddit: string) => Promise<void>,
  archiveHackernews: () => Promise<void>
) {
  const subreddits = subscriptions
    .filter(
      (subscriptions) =>
        subscriptions.data.service === "reddit" && subscriptions.data.subservice
    )
    .map((subscription) => subscription.data.subservice) as string[];
  const uniqueSubreddits = [...new Set(subreddits)];

  const promises: Promise<any>[] = [];

  uniqueSubreddits.forEach((subreddit) => {
    if (subreddit) {
      promises.push(archiveSubreddit(subreddit));
    }
  });

  promises.push(archiveHackernews());

  await Promise.all(promises);
}

export { archiveSubscriptions };
