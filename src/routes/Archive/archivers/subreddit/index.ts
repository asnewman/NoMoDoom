import axios from "axios";
import {
  Item,
  MongoArchive,
  MongoArchiveSubredditData,
  MONGO_TYPES,
  SubredditPost,
} from "../../../../mongoose";
import { getTopThreePosts } from "./pure";

export default async function archiveSubreddit(subreddit: string) {
  const redditPostsData = await axios.get(
    `https://www.reddit.com/r/${subreddit}/top.json`
  );

  const topPosts: SubredditPost[] = getTopThreePosts(
    redditPostsData.data.data.children
  );
  const newArchiveItemData: MongoArchiveSubredditData = {
    type: "subreddit",
    subreddit,
    datetime: new Date().getTime(),
    topPosts
  }
  const newArchiveItem: MongoArchive = {
    type: MONGO_TYPES.ARCHIVE,
    data: newArchiveItemData,
  };

  await new Item(newArchiveItem).save();
}
