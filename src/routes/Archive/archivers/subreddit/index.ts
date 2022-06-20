import axios from "axios";
import { Item, MongoSubredditData, MONGO_TYPES, SubredditPost } from "../../../../mongoose";
import { getTopThreePosts } from "./pure";

export default async function archiveSubreddit(subreddit: string) {
  const redditPostsData = await axios.get(
    `https://www.reddit.com/r/${subreddit}/top.json`
  );

  const topThreePosts: SubredditPost[] = getTopThreePosts(
    redditPostsData.data.data.children
  );
  const newSubredditItem: { type: string; data: MongoSubredditData } = {
    type: MONGO_TYPES.SUBREDDIT,
    data: {
      subreddit,
      datetime: new Date().getTime(),
      topPosts: topThreePosts,
    },
  };

  await new Item(newSubredditItem).save();
}
