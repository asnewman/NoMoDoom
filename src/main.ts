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
import hackernewsController from "./routes/Hackernews";
import archiveController from "./routes/Archive";
import emailController from "./routes/Email";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not set");
  exit(1);
}
mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

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

app.post("/api/schedule-archives", schedulerAuthCheck, archiveController)
app.post("/api/schedule-emails", schedulerAuthCheck, emailController)

app.listen(port, () => {
  console.log("I am awake");
});