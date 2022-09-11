import { MongoSubscription, MongoUser } from "../../../mongoose";
import generateRedditPageData from "./generateRedditPageData";

describe("generateRedditPageDataTests", () => {
  it("generates free user data correctly", async () => {
    const email = "hello@mail.com";
    const dummyUser: MongoUser = {
      type: "USER",
      data: {
        email: email,
        signedInWithToken: true,
        token: "SmmnABX7MYzy0zLOZDHA",
        tokenExpiration: 1656060077717,
        frequency: 1,
        lastSent: 1657667357179,
      },
    };

    const dummyGetUser = (_email: string): Promise<MongoUser> => {
      return new Promise((resolve) => {
        resolve(dummyUser);
      });
    };

    const dummyGetSubscriptions = (): Promise<MongoSubscription[]> => {
      return new Promise((resolve) => {
        resolve([
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", subservice: "programming", email },
          },
        ]);
      });
    };

    const result = await generateRedditPageData(
      email,
      dummyGetUser,
      dummyGetSubscriptions,
    );

    expect(result).toEqual({
      email,
      subreddits: ["programming"],
    });
  });
  it("generates free user data with invalid subreddit data correctly", async () => {
    const email = "hello@mail.com";
    const dummyUser: MongoUser = {
      type: "USER",
      data: {
        email: email,
        signedInWithToken: true,
        token: "SmmnABX7MYzy0zLOZDHA",
        tokenExpiration: 1656060077717,
        frequency: 1,
        lastSent: 1657667357179,
      },
    };

    const dummyGetUser = (_email: string): Promise<MongoUser> => {
      return new Promise((resolve) => {
        resolve(dummyUser);
      });
    };

    const dummyGetSubscriptions = (): Promise<MongoSubscription[]> => {
      return new Promise((resolve) => {
        resolve([
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", subservice: "programming", email },
          },
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", email },
          },
        ]);
      });
    };

    const result = await generateRedditPageData(
      email,
      dummyGetUser,
      dummyGetSubscriptions,
    );

    expect(result).toEqual({
      email,
      subreddits: ["programming", "unknown subreddit"],
    });
  });
  it("generates expired user data correctly", async () => {
    const email = "hello@mail.com";
    const dummyUser: MongoUser = {
      type: "USER",
      data: {
        email: email,
        signedInWithToken: true,
        token: "SmmnABX7MYzy0zLOZDHA",
        tokenExpiration: 1656060077717,
        frequency: 1,
        lastSent: 1657667357179,
      },
    };

    const dummyGetUser = (_email: string): Promise<MongoUser> => {
      return new Promise((resolve) => {
        resolve(dummyUser);
      });
    };

    const dummyGetSubscriptions = (): Promise<MongoSubscription[]> => {
      return new Promise((resolve) => {
        resolve([
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", subservice: "programming", email },
          },
        ]);
      });
    };

    const result = await generateRedditPageData(
      email,
      dummyGetUser,
      dummyGetSubscriptions,
    );

    expect(result).toEqual({
      email,
      subreddits: ["programming"],
    });
  });
  it("generates premium user data correctly", async () => {
    const email = "hello@mail.com";
    const dummyUser: MongoUser = {
      type: "USER",
      data: {
        email: email,
        signedInWithToken: true,
        token: "SmmnABX7MYzy0zLOZDHA",
        tokenExpiration: 1656060077717,
        frequency: 1,
        lastSent: 1657667357179,
      },
    };

    const dummyGetUser = (_email: string): Promise<MongoUser> => {
      return new Promise((resolve) => {
        resolve(dummyUser);
      });
    };

    const dummyGetSubscriptions = (): Promise<MongoSubscription[]> => {
      return new Promise((resolve) => {
        resolve([
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", subservice: "programming", email },
          },
        ]);
      });
    };

    const result = await generateRedditPageData(
      email,
      dummyGetUser,
      dummyGetSubscriptions,
    );

    expect(result).toEqual({
      email,
      subreddits: ["programming"],
    });
  });
  it("throws missing user", async () => {
    const email = "hello@mail.com";

    const dummyGetUser = (_email: string): Promise<MongoUser | undefined> => {
      return new Promise((resolve) => {
        resolve(undefined);
      });
    };

    const dummyGetSubscriptions = (): Promise<MongoSubscription[]> => {
      return new Promise((resolve) => {
        resolve([
          {
            type: "SUBSCRIPTION",
            data: { service: "reddit", subservice: "programming", email },
          },
        ]);
      });
    };

    try {
      await generateRedditPageData(
        email,
        dummyGetUser,
        dummyGetSubscriptions,
      );
      expect(false).toBe(true);
    } catch (_e) {
      expect(true).toBe(true);
    }
  });
});
