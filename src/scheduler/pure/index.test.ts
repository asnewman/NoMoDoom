import { generateArchiveEvents, generateEmailEvents } from "./index";
import { MongoSubscriptionData, MongoUserData } from "../../mongoose";

describe("generateArchiveEvents tests", () => {
  test("generates correctly", () => {
    const dummySubscriptions: { type: string; data: MongoSubscriptionData }[] =
      [
        {
          type: "",
          data: {
            service: "reddit",
            subservice: "javascript",
            email: "test@email.com",
          },
        },
        {
          type: "",
          data: {
            service: "reddit",
            subservice: "programming",
            email: "test@email.com",
          },
        },
      ];

    expect(generateArchiveEvents(dummySubscriptions)).toEqual([
      {
        service: "reddit",
        subservice: "javascript",
      },
      {
        service: "reddit",
        subservice: "programming",
      },
    ]);
  });
});

describe("generateEmailEvents tests", () => {
  test("generates correctly", () => {
    const dummyUsers: { type: string; data: MongoUserData }[] = [
      {
        type: "",
        data: {
          token: "",
          tokenExpiration: 0,
          signedInWithToken: true,
          email: "test1@mail.com",
          frequency: 1,
          lastSent: 8700000,
        },
      },
      {
        type: "",
        data: {
          token: "",
          tokenExpiration: 0,
          signedInWithToken: true,
          email: "test2@mail.com",
          frequency: 1,
          lastSent: 0,
        },
      },
    ];

    expect(generateEmailEvents(dummyUsers, 8800000)).toEqual([
      {
        email: "test2@mail.com",
      },
    ]);
  });
});
