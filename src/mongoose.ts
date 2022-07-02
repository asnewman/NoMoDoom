import mongoose, { Schema } from "mongoose";

const MONGO_TYPES = {
  USER: "USER",
  SUBSCRIPTION: "SUBSCRIPTION",
  ARCHIVE: "ARCHIVE",
  EMAIL: "EMAIL",
} as const;

interface MongoBase {
  type: keyof typeof MONGO_TYPES;
}

interface MongoEmail extends MongoBase {
  type: "EMAIL";
  data: {
    email: string;
    content: string;
    datetime: number;
  };
}

interface MongoSubscription extends MongoBase {
  type: "SUBSCRIPTION";
  data: {
    service: "reddit" | "hackernews";
    subservice?: string;
    email: string;
  };
}

interface MongoUser extends MongoBase {
  type: "USER";
  data: {
    token: string;
    tokenExpiration: number;
    signedInWithToken: boolean;
    email: string;
    frequency: 1;
    lastSent: number;
  };
}

interface MongoArchive extends MongoBase {
  type: "ARCHIVE";
  data: MongoArchiveHackernewsData | MongoArchiveSubredditData;
}

interface MongoArchiveHackernewsData {
  type: "hackernews";
  datetime: number; // epoch
  data: {
    title: string;
    score: number;
    link: string;
  }[];
}

interface MongoArchiveSubredditData {
  type: "subreddit";
  subreddit: string;
  datetime: number; // epoch
  topPosts: SubredditPost[];
}

interface SubredditPost {
  title: string;
  score: number;
  url: string;
}

const ItemSchema = new Schema({
  type: String,
  data: Object,
});

const Item = mongoose.model("Item", ItemSchema);

export {
  Item,
  MONGO_TYPES,
  MongoEmail,
  MongoSubscription,
  MongoArchive,
  MongoArchiveHackernewsData,
  MongoArchiveSubredditData,
  MongoUser,
  SubredditPost,
};
