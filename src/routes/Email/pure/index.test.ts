import { generateEmailData } from ".";
import { MongoSubscriptionData, MongoUserData } from "../../../mongoose";

describe("generateEmailData tests", () => {
  test("generates correctly", async () => {
    const dummyUser: { type: string; data: MongoUserData } = {
      type: "",
      data: {
        token: "",
        tokenExpiration: 0,

        signedInWithToken: true,
        email: "test@mail.com",
        frequency: 1,
        lastSent: 0,
      },
    };

    const dummySubscriptions: { type: string; data: MongoSubscriptionData }[] =
      [
        {
          type: "",
          data: {
            service: "reddit",
            subservice: "javascript",
            email: "test@mail.com",
          },
        },
      ];

    const res = await generateEmailData(
      dummyUser,
      dummySubscriptions,
      async (_subreddits, _gtTimeStamp) => {
        return [
          {
            type: "",
            data: {
              subreddit: "javascript",
              datetime: 0,
              topPosts: [
                {
                  title: "Great post",
                  score: 10,
                  url: "url/1",
                },
                {
                  title: "Another post",
                  score: 8,
                  url: "url/2",
                },
                {
                  title: "Final post",
                  score: 3,
                  url: "url/3",
                },
              ],
            },
          },
        ];
      }
    );

    expect(res).toEqual({
      email: "test@mail.com",
      subreddits: [
        {
          name: "javascript",
          posts: [
            {
              title: "Great post",
              score: 10,
              url: "url/1",
            },
            {
              title: "Another post",
              score: 8,
              url: "url/2",
            },
            {
              title: "Final post",
              score: 3,
              url: "url/3",
            },
          ],
        },
      ],
    });
  });
});
