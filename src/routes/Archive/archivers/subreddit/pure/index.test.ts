import { getTopThreePosts } from ".";

describe("Subreddit pure tests", () => {
  it("gets all fields correctly", () => {
    const dummyData = [
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
    ];

    expect(getTopThreePosts(dummyData)).toEqual([
      {
        title: "foo",
        score: 4,
        url: "https://www.reddit.com/r/javascript",
      },
    ]);
  });

  it("limits to 3 posts", () => {
    const dummyData = [
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
        },
      },
    ];

    expect(getTopThreePosts(dummyData).length).toBe(3);
  });
});
