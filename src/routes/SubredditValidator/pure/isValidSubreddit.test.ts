import {isValidSubreddit, SubredditQueryResult} from "./isValidSubreddit";

describe("isValidSubreddit", () => {
  it("validates a valid subreddit", async () => {
    const dummyGet: () => Promise<SubredditQueryResult> = () => {
      return new Promise((resolve) => {
        resolve({ data: {data: { children: [{ data: {subreddit_type: "public" }}] } }});
      });
    };
    expect(await isValidSubreddit(dummyGet)).toBe(true);
  });

  it("validates a private subreddit", async () => {
    const dummyGet: () => Promise<SubredditQueryResult> = () => {
      return new Promise((resolve) => {
        resolve({ data: { data: { children: [{ data: {subreddit_type: "private" }}] } }});
      });
    };
    expect(await isValidSubreddit(dummyGet)).toBe(false);
  });

  it("validates an incorrect subreddit", async () => {
    const dummyGet: () => Promise<SubredditQueryResult> = () => {
      return new Promise((_resolve, reject) => {
        reject({ data: { data: { children: [] } }});
      });
    };
    expect(await isValidSubreddit(dummyGet)).toBe(false);
  });
});
