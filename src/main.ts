import "dotenv/config";
import express from "express";
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
import { prepareEmailController, sendEmailController } from "./routes/Email";
import log from "./helpers/logger";
import path from "path";
import nomodoomController from "./routes/Nomodoom";
import { dbInit } from "./mongoose";
import { stripeWebhook } from "./routes/Stripe/stripe";

if (!process.env.MONGO_URI) {
  console.error("error", "MONGO_URI not set");
  exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", authCheck, homeController);

app.get("/reddit", authCheck, redditController);

app.get("/hackernews", authCheck, hackernewsController);

app.get("/nomodoom", authCheck, nomodoomController);

app.get("/create-link", (_req: any, res: any) => {
  res.render("CreateLink");
});
app.post("/create-link", createLoginLinkController);

app.get("/login", loginController);

app.post("/api/item-crud", authCheck, itemCrudController);

app.post("/api/create-archives", schedulerAuthCheck, archiveController);
app.post("/api/prepare-emails", schedulerAuthCheck, prepareEmailController);
app.post("/api/send-emails", schedulerAuthCheck, sendEmailController);

dbInit().then(() => {
  app.listen(port, async () => {
    await log("info", "I am awake");
  });
});
