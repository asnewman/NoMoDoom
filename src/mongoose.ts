import mongoose, { Schema } from "mongoose";
import { SubredditData } from "./archivers/subreddit/types";

const MONGO_TYPES = {
  SUBREDDIT: "SUBREDDIT",
};

interface MongoSubredditData {
  subreddit: string;
  datetime: number; // epoch
  topPosts: SubredditData[];
}

const ItemSchema = new Schema({
  type: String,
  data: Object,
});

const Item = mongoose.model("Item", ItemSchema);

export { Item, MONGO_TYPES, MongoSubredditData };
