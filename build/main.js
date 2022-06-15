"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var process_1 = require("process");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var CreateLoginLink_1 = __importDefault(require("./routes/CreateLoginLink"));
var Login_1 = __importDefault(require("./routes/Login"));
var authCheck_1 = __importDefault(require("./middleware/authCheck"));
var schedulerAuthCheck_1 = __importDefault(require("./middleware/schedulerAuthCheck"));
var Home_1 = __importDefault(require("./routes/Home"));
var Reddit_1 = __importDefault(require("./routes/Reddit"));
var ItemCrud_1 = __importDefault(require("./routes/ItemCrud"));
var watcher_1 = __importDefault(require("./email/watcher"));
var watcher_2 = __importDefault(require("./archivers/watcher"));
var Hackernews_1 = __importDefault(require("./routes/Hackernews"));
var scheduler_1 = require("./scheduler");
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set");
    (0, process_1.exit)(1);
}
mongoose_1.default.connect(process.env.MONGO_URI);
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
(0, watcher_1.default)();
(0, watcher_2.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set("views", "./src/views");
app.set("view engine", "pug");
app.get("/", authCheck_1.default, Home_1.default);
app.get("/reddit", authCheck_1.default, Reddit_1.default);
app.get("/hackernews", authCheck_1.default, Hackernews_1.default);
app.get("/create-link", function (_req, res) {
    res.render("CreateLink");
});
app.post("/create-link", CreateLoginLink_1.default);
app.get("/login", Login_1.default);
app.post("/api/item-crud", authCheck_1.default, ItemCrud_1.default);
app.post("/api/schedule-archives", schedulerAuthCheck_1.default, function (_req, res) { (0, scheduler_1.sendArchivingEvents)(); res.send(); });
app.post("/api/schedule-emails", schedulerAuthCheck_1.default, function (_req, res) { (0, scheduler_1.sendEmailEvents)(); res.send(); });
app.listen(port, function () {
    console.log("I am awake");
});
//# sourceMappingURL=main.js.map