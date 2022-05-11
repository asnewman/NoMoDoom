import { SubredditData } from "../types";

export async function getTopThreePosts(
  fetchFunction: () => Promise<{ data: Record<string, string | number>}[]>
): Promise<SubredditData[]> {
  const rawData = await fetchFunction();
  const res: SubredditData[] = [];
  
  for (const entry of rawData) {
    res.push({
      title: entry.data["title"] as string,
      score: entry.data["score"] as number,
      url: `https://www.reddit.com${entry.data["permalink"]}`,
    });

    if (res.length === 3) break;
  }

  return res;
}
