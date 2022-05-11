import axios from "axios";
import { getTopThreePosts } from "./pure";
import { SubredditData } from "./types";
import { Item, MongoSubredditData, MONGO_TYPES } from "../../mongoose";

export default async function archiveSubreddit(subreddit: string) {
  const fetchFunction = async () => {
    const { data } = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json`
    );
    return data.data.children;
  };

  const topThreePosts: SubredditData[] = await getTopThreePosts(fetchFunction);
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
