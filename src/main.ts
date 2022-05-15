import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { exit } from "process";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import createLoginLinkController from './CreateLoginLink';
import loginController from './Login';
import authCheck from "./middleware/authCheck"
import homeController from "./Home"
import itemCrudController from "./ItemCrud"

if (!process.env.MONGO_URI) {
  exit(1)
}
mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', authCheck, homeController)

app.get('/create-link', (_req: any, res: any) => {
  res.render("CreateLink")
})
app.post('/create-link', createLoginLinkController)

app.get("/login", loginController)

app.post("/api/item-crud", authCheck, itemCrudController)

app.listen(port, () => {
  console.log("started")
})