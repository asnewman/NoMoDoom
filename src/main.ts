import "dotenv/config";
import mongoose from "mongoose";
import archiveSubreddit from "./archivers/subreddit";

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await archiveSubreddit("javascript");
    console.log("done");
  } catch (e) {
    console.error(e);
  }
}

main();
