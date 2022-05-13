import { SubredditData } from "../types";

export function getTopThreePosts(redditPostsData: { data: Record<string, string | number>}[]): SubredditData[] {
  const res: SubredditData[] = [];
  
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
