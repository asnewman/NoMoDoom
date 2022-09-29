import axios from "axios";
import log from "../../../../helpers/logger";
import {
  Item,
  MongoArchive,
  MongoArchiveSubredditData,
  MONGO_TYPES,
  SubredditPost,
} from "../../../../mongoose";
import { getTopThreePosts } from "./pure";

export default async function archiveSubreddit(subreddit: string) {
  try {
    const redditPostsData = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json`
    );

    const topPosts: SubredditPost[] = await getTopThreePosts(
      redditPostsData.data.data.children,
      async (url: string) => {
        try {
          const { data } = (await axios.get(url)) as any;
          return data[1]?.data.children.map((c: any) => ({ ...c.data })) || [];
        } catch (e) {
          await log("error", "Failed " + url);
          return [];
        }
      }
    );
    const newArchiveItemData: MongoArchiveSubredditData = {
      type: "subreddit",
      subreddit,
      datetime: new Date().getTime(),
      topPosts,
    };
    const newArchiveItem: MongoArchive = {
      type: MONGO_TYPES.ARCHIVE,
      data: newArchiveItemData,
    };

    await new Item(newArchiveItem).save();
    await log("info", `Successfully archived ${subreddit}`);
  } catch (e) {
    await log("error", `Failed to archived ${subreddit}`);
    await log("error", e);
  }
}
