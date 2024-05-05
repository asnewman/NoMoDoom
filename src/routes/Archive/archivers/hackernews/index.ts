import axios from "axios";
import log from "../../../../helpers/logger";
import {
  Item,
  MongoArchive,
  MongoArchiveHackernewsData,
  MONGO_TYPES,
} from "../../../../mongoose";
import { getTopPostsForDay } from "./pure";

export default async function archiveHackernews() {
  await log("info", "Archiving Hacker News (at least trying to...)");
  const htmls: string[] = [];

  for (let i = 1; i <= 6; i++) {
    try {
      htmls.push(
        (await axios.get(`https://news.ycombinator.com/best?p=${i}`)).data
      );
    }
    catch (e) {
      console.log("failed to https://news.ycombinator.com/best?p=${i}")
      console.error(e)
    }
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000);
    });
  }

  const posts = await getTopPostsForDay(
    htmls,
    Date.now(),
    async (id: number) => {
      return (
        try {
          await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        }
        catch(e) {
          console.log("failed to https://hacker-news.firebaseio.com/v0/item/${id}.json")
          console.error(e)
        }
      ).data;
    }
  );

  const archiveData: MongoArchiveHackernewsData = {
    type: "hackernews",
    datetime: Date.now(),
    data: [],
  };
  for (const post of posts) {
    archiveData.data.push({
      title: post.title,
      score: post.score,
      link: post.link,
      comments: post.comments,
    });
  }

  const archive: MongoArchive = {
    type: MONGO_TYPES.ARCHIVE,
    data: archiveData,
  };

  await Item.create(archive);
  await log("info", "Finished archiving Hacker News");
}
