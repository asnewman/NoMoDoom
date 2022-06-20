import axios from "axios";
import { Item, MongoArchiveData, MONGO_TYPES } from "../../../../mongoose";
import { getTopPostsForDay } from "./pure";

export default async function archiveHackernews() {
  const htmls: string[] = [];

  for (let i = 1; i <= 7; i++) {
    htmls.push(
      (await axios.get(`https://news.ycombinator.com/best?p=${i}`)).data
    );
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000);
    });
  }

  const posts = getTopPostsForDay(htmls, Date.now());
  const archiveData: MongoArchiveData = {
    type: "hackernews",
    datetime: Date.now(),
    data: [],
  };
  for (const post of posts) {
    archiveData.data.push({
      title: post.title,
      score: post.score,
      link: post.link,
    });
  }

  await Item.create({
    type: MONGO_TYPES.ARCHIVE,
    data: archiveData,
  });
}
