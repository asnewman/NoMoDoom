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
var Home_1 = __importDefault(require("./routes/Home"));
var ItemCrud_1 = __importDefault(require("./routes/ItemCrud"));
var watcher_1 = __importDefault(require("./email/watcher"));
var watcher_2 = __importDefault(require("./archivers/watcher"));
var scheduler_1 = __importDefault(require("./scheduler"));
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set");
    (0, process_1.exit)(1);
}
mongoose_1.default.connect(process.env.MONGO_URI);
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set("views", "./src/views");
app.set("view engine", "pug");
app.get("/", authCheck_1.default, Home_1.default);
app.get("/create-link", function (_req, res) {
    res.render("CreateLink");
});
app.post("/create-link", CreateLoginLink_1.default);
app.get("/login", Login_1.default);
app.post("/api/item-crud", authCheck_1.default, ItemCrud_1.default);
app.listen(port, function () {
    console.log("started");
});
(0, watcher_1.default)();
(0, watcher_2.default)();
(0, scheduler_1.default)();
//# sourceMappingURL=main.js.map