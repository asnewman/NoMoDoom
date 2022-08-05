interface SubredditQueryResult {
  data: {
    data: {
      children: {
        data: {
          subreddit_type?: "public" | "private";
        };
      }[];
    };
  };
}

async function isValidSubreddit(
  getSubreddit: () => Promise<SubredditQueryResult>
) {
  try {
    const res = await getSubreddit();
    return res.data.data.children[0]?.data.subreddit_type === "public";
  } catch (e) {
    return false;
  }
}

export { isValidSubreddit, SubredditQueryResult };
