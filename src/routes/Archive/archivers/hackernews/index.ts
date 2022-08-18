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
  await log("info", "Archiving Hacker News");
  const htmls: string[] = [];

  for (let i = 1; i <= 6; i++) {
    htmls.push(
      (await axios.get(`https://news.ycombinator.com/best?p=${i}`)).data
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000);
    });
  }

  const posts = await getTopPostsForDay(
    htmls,
    Date.now(),
    async (id: number) => {
      return (
        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
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
