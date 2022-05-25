import mongoose, { Schema } from "mongoose";
import { SubredditData } from "./archivers/subreddit/types";

const MONGO_TYPES = {
  SUBREDDIT: "SUBREDDIT",
  USER: "USER",
  SUBSCRIPTION: "SUBSCRIPTION",
};

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
  MongoSubredditData,
  MongoUserData,
  MongoSubscriptionData,
};
