import { generateEmailData } from ".";
import {MongoSubscription, MongoUser, MONGO_TYPES} from "../../../mongoose";

describe("generateEmailData tests", () => {
  test("generates correctly no hackernews", async () => {
    const dummyUser: MongoUser = {
      type: MONGO_TYPES.USER,
      data: {
        token: "",
        tokenExpiration: 0,

        signedInWithToken: true,
        email: "test@mail.com",
        frequency: 1,
        lastSent: 0,
      },
    };

    const dummySubscriptions: MongoSubscription[] =
      [
        {
          type: MONGO_TYPES.SUBSCRIPTION,
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
            type: MONGO_TYPES.ARCHIVE,
            data: {
              type: "subreddit",
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
      },
      async () => ({
        type: MONGO_TYPES.ARCHIVE,
        data: {
          type: "hackernews",
          datetime: 0,
          data: [
            {
              title: "A title",
              score: 100,
              link: "hacker.com/1"
            },
            {
              title: "A title2",
              score: 99,
              link: "hacker.com/2"
            },
          ]
        }
      })
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
      hackernews: null    });
  });
  test("generates correctly", async () => {
    const dummyUser: MongoUser = {
      type: MONGO_TYPES.USER,
      data: {
        token: "",
        tokenExpiration: 0,

        signedInWithToken: true,
        email: "test@mail.com",
        frequency: 1,
        lastSent: 0,
      },
    };

    const dummySubscriptions: MongoSubscription[] =
      [
        {
          type: MONGO_TYPES.SUBSCRIPTION,
          data: {
            service: "reddit",
            subservice: "javascript",
            email: "test@mail.com",
          },
        },
        {
          type: MONGO_TYPES.SUBSCRIPTION,
          data: {
            service: "hackernews",
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
            type: MONGO_TYPES.ARCHIVE,
            data: {
              type: "subreddit",
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
      },
      async () => ({
        type: MONGO_TYPES.ARCHIVE,
        data: {
          type: "hackernews",
          datetime: 0,
          data: [
            {
              title: "A title",
              score: 100,
              link: "hacker.com/1"
            },
            {
              title: "A title2",
              score: 99,
              link: "hacker.com/2"
            },
          ]
        }
      })
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
      hackernews:  {
          type: "hackernews",
          datetime: 0,
          data: [
            {
              title: "A title",
              score: 100,
              link: "hacker.com/1"
            },
            {
              title: "A title2",
              score: 99,
              link: "hacker.com/2"
            },
          ]
        }
    });
  });
});
