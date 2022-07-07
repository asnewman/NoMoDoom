"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
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
var Hackernews_1 = __importDefault(require("./routes/Hackernews"));
var Archive_1 = __importDefault(require("./routes/Archive"));
var Email_1 = require("./routes/Email");
var logger_1 = __importDefault(require("./helpers/logger"));
var path_1 = __importDefault(require("path"));
var Nomodoom_1 = __importDefault(require("./routes/Nomodoom"));
var mongoose_1 = require("./mongoose");
if (!process.env.MONGO_URI) {
    console.error("error", "MONGO_URI not set");
    (0, process_1.exit)(1);
}
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set("views", "./src/views");
app.set("view engine", "pug");
app.get("/", authCheck_1.default, Home_1.default);
app.get("/reddit", authCheck_1.default, Reddit_1.default);
app.get("/hackernews", authCheck_1.default, Hackernews_1.default);
app.get("/nomodoom", authCheck_1.default, Nomodoom_1.default);
app.get("/create-link", function (_req, res) {
    res.render("CreateLink");
});
app.post("/create-link", CreateLoginLink_1.default);
app.get("/login", Login_1.default);
app.post("/api/item-crud", authCheck_1.default, ItemCrud_1.default);
app.post("/api/schedule-archives", schedulerAuthCheck_1.default, Archive_1.default);
app.post("/api/schedule-emails", schedulerAuthCheck_1.default, Email_1.emailController);
app.post("/api/schedule-emailsAfterFailure", schedulerAuthCheck_1.default, Email_1.emailAfterFailureController);
(0, mongoose_1.dbInit)().then(function () {
    app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, logger_1.default)("info", "I am awake")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=main.js.map