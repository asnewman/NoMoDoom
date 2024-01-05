import {getTopThreePosts} from "../routes/Archive/archivers/subreddit/pure";
import axios from "axios";
import log from "../helpers/logger";

async function getSubredditArchiveData(subreddit: string) {
  const redditPostsData = await axios.get(
    `https://www.reddit.com/r/${subreddit}/top.json`
  );

  return getTopThreePosts(
    redditPostsData.data.data.children,
    async (url: string) => {
      try {
        const { data } = (await axios.get(encodeURI(url))) as any;
        return data[1]?.data.children.map((c: any) => ({ ...c.data })) || [];
      } catch (e) {
        await log("error", "Failed " + url);
        return [];
      }
    }
  );
}

getSubredditArchiveData("birding").then((result) => {
  console.log(JSON.stringify(result, null, 2))
})