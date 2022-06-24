import { archiveSubscriptions } from "."
import { MongoSubscription } from "../../../mongoose";

describe("archiveSubscription", () => {
  it("dedupes properly", () => {
    const archivedSubreddits: string[] = []
    const archiveSubreddit = async (subreddit: string) => {
      archivedSubreddits.push(subreddit);
    }

    let didArchiveHackernews = false
    const archiveHackernews = async () => {
      didArchiveHackernews = true
    }

    archiveSubscriptions(
      dummySubscriptions,
      archiveSubreddit,
      archiveHackernews
    );

    expect(archivedSubreddits[0]).toBe("javascript")
    expect(archivedSubreddits[1]).toBe("photography")
    expect(archivedSubreddits.length).toBe(2)
    expect(didArchiveHackernews).toBe(true)
  })
})

const dummySubscriptions: MongoSubscription[] = [
  {
    type: "SUBSCRIPTION",
    data: {
      service: "reddit",
      subservice: "javascript",
      email: "example@mail.com",
    }
  },
  {
    type: "SUBSCRIPTION",
    data: {
      service: "reddit",
      subservice: "javascript",
      email: "example@mail.com",
    }
  },
  {
    type: "SUBSCRIPTION",
    data: {
      service: "reddit",
      subservice: "photography",
      email: "example@mail.com",
    }
  },
  {
    type: "SUBSCRIPTION",
    data: {
      service: "hackernews",
      email: "example@mail.com",
    }
  },
  {
    type: "SUBSCRIPTION",
    data: {
      service: "hackernews",
      email: "example@mail.com",
    }
  },
]