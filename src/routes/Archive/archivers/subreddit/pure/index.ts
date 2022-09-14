import { SubredditPost } from "../../../../../mongoose";

export async function getTopThreePosts(
  redditPostsData: { data: Record<string, string | number> }[],
  getPostComments: (
    url: string
  ) => Promise<
    { body: string; author: string; permalink: string; score: number }[]
  >
): Promise<SubredditPost[]> {
  const res: SubredditPost[] = [];

  for (const entry of redditPostsData) {
    const postComments = await getPostComments(
      `https://www.reddit.com${entry.data["permalink"]}.json`
    );
    const sortedComments = postComments
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    const topThreeComments: SubredditPost["topThreeComments"] =
      sortedComments.map((comment) => ({
        user: comment.author,
        content: comment.body,
        link: `https://www.reddit.com/${comment["permalink"]}`,
        score: comment.score,
      }));

    res.push({
      title: entry.data["title"] as string,
      score: entry.data["score"] as number,
      url: `https://www.reddit.com${entry.data["permalink"]}`,
      selftext: entry.data["selftext"] as string || undefined,
      topThreeComments,
    });

    if (res.length === 3) break;
  }

  return res;
}
