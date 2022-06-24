import { SubredditPost } from "../../../../../mongoose";

export function getTopThreePosts(
  redditPostsData: { data: Record<string, string | number> }[]
): SubredditPost[] {
  const res: SubredditPost[] = [];

  for (const entry of redditPostsData) {
    res.push({
      title: entry.data["title"] as string,
      score: entry.data["score"] as number,
      url: `https://www.reddit.com${entry.data["permalink"]}`,
    });

    if (res.length === 3) break;
  }

  return res;
}
