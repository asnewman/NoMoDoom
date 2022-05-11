import { getTopThreePosts } from ".";

describe("Subreddit pure tests", () => {
  it("gets all fields correctly", async () => {
    const dummyFetch = async () => {
      return [
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
      ];
    };

    expect(await getTopThreePosts(dummyFetch)).toEqual([
      {
        title: "foo",
        score: 4,
        url: "https://www.reddit.com/r/javascript",
      },
    ]);
  });

  it("limits to 3 posts", async () => {
    const dummyFetch = async () => {
      return [
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
        {
          data: {
            title: "foo",
            score: 4,
            permalink: "/r/javascript",
          }
        },
      ];
    };

    expect((await getTopThreePosts(dummyFetch)).length).toBe(3);
  });
});
