import mongoose, { Schema } from "mongoose";
import { SubredditData } from "./routes/Archive/archivers/subreddit/types";

const MONGO_TYPES = {
  SUBREDDIT: "SUBREDDIT",
  USER: "USER",
  SUBSCRIPTION: "SUBSCRIPTION",
  ARCHIVE: "ARCHIVE"
};

interface HackerNewsArchiveData {
  title: string;
  score: number;
  link: string;
}

interface MongoArchiveData {
  datetime: number; // epoch
  data: HackerNewsArchiveData[];
}

interface MongoSubredditData {
  subreddit: string;
  datetime: number; // epoch
  topPosts: SubredditData[];
}

interface MongoUserData {
  token: string;
  tokenExpiration: number;
  signedInWithToken: boolean;
  email: string;
  frequency: 1;
  lastSent: number;
}

interface MongoSubscriptionData {
  service: string;
  subservice?: string;
  email: string;
}

const ItemSchema = new Schema({
  type: String,
  data: Object,
});

const Item = mongoose.model("Item", ItemSchema);

export {
  Item,
  MONGO_TYPES,
  HackerNewsArchiveData,
  MongoArchiveData,
  MongoSubredditData,
  MongoUserData,
  MongoSubscriptionData,
};
