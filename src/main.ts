import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { exit } from "process";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import createLoginLinkController from "./routes/CreateLoginLink";
import loginController from "./routes/Login";
import authCheck from "./middleware/authCheck";
import schedulerAuthCheck from "./middleware/schedulerAuthCheck";
import homeController from "./routes/Home";
import redditController from "./routes/Reddit";
import itemCrudController from "./routes/ItemCrud";
import emailWatcher from "./email/watcher";
import archiveWatcher from "./archivers/watcher";
import hackernewsController from "./routes/Hackernews";
import { sendArchivingEvents, sendEmailEvents } from "./scheduler";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not set");
  exit(1);
}
mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

emailWatcher()
archiveWatcher()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", authCheck, homeController);

app.get("/reddit", authCheck, redditController);

app.get("/hackernews", authCheck, hackernewsController);

app.get("/create-link", (_req: any, res: any) => {
  res.render("CreateLink");
});
app.post("/create-link", createLoginLinkController);

app.get("/login", loginController);

app.post("/api/item-crud", authCheck, itemCrudController);

app.post("/api/schedule-archives", schedulerAuthCheck, (_req, res) => {sendArchivingEvents(); res.send()})
app.post("/api/schedule-emails", schedulerAuthCheck, (_req, res) => {sendEmailEvents(); res.send()})

app.listen(port, () => {
  console.log("I am awake");
});