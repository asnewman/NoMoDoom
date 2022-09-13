import { getTopThreePosts } from ".";

const dummyGetPostComments = async (
  _url: string
): Promise<
  { body: string; author: string; permalink: string; score: number }[]
> => {
  return [
    {
      body: "helloworld1",
      author: "foo1",
      permalink: "url1",
      score: 3,
    },
    {
      body: "helloworld2",
      author: "foo2",
      permalink: "url2",
      score: 10,
    },
    {
      body: "helloworld3",
      author: "foo3",
      permalink: "url3",
      score: 5,
    },
    {
      body: "helloworld4",
      author: "foo4",
      permalink: "url4",
      score: 6,
    },
  ];
};

describe("Subreddit pure tests", () => {
  it("gets all fields correctly", async () => {
    const dummyData = [
      {
        data: {
          title: "foo",
          score: 4,
          permalink: "/r/javascript",
          selftext: "hello world"
        },
      },
    ];

    expect(await getTopThreePosts(dummyData, dummyGetPostComments)).toEqual([
      {
        title: "foo",
        score: 4,
        url: "https://www.reddit.com/r/javascript",
        selftext: "hello world",
        topThreeComments: [
          {
            content: "helloworld2",
            user: "foo2",
            link: "https://www.reddit.com/url2",
            score: 10,
          },
          {
            content: "helloworld4",
            user: "foo4",
            link: "https://www.reddit.com/url4",
            score: 6,
          },
          {
            content: "helloworld3",
            user: "foo3",
            link: "https://www.reddit.com/url3",
            score: 5,
          },
        ],
      },
    ]);
  });

  it("limits to 3 posts", async () => {
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

    expect(
      (await getTopThreePosts(dummyData, dummyGetPostComments)).length
    ).toBe(3);
  });
});
