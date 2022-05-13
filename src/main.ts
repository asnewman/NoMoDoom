import "dotenv/config";
import mongoose from "mongoose";
import sendMagicLink from "./magicLinkSender";

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      return
    }
    mongoose.connect(process.env.MONGO_URI);
    console.log("done");
  } catch (e) {
    console.error(e);
  }
}

main();
