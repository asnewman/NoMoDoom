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
var nodemailer_1 = __importDefault(require("nodemailer"));
var mongoose_1 = require("../../mongoose");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var emailHtmlGenerators_1 = require("./pure/emailHtmlGenerators");
var logger_1 = __importDefault(require("../../helpers/logger"));
function emailUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, subscriptions, transporter, subreddits, subredditData, hackernewsData, emailText, isSubscribedToHackernews, mongoEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.Item.findOne({
                        "data.email": email,
                    })];
                case 1:
                    user = _a.sent();
                    if (!!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, logger_1.default)("error", "Email not found: ".concat(email))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, mongoose_1.Item.find({
                        type: mongoose_1.MONGO_TYPES.SUBSCRIPTION,
                        "data.email": email,
                    })];
                case 4:
                    subscriptions = _a.sent();
                    if (subscriptions.length === 0) {
                        return [2 /*return*/];
                    }
                    transporter = nodemailer_1.default.createTransport({
                        host: "mail.privateemail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.EMAIL_PASS,
                        },
                    });
                    subreddits = subscriptions
                        .filter(function (subscription) { return subscription.data.service === "reddit"; })
                        .map(function (subscription) { return subscription.data.subservice; })
                        .filter(function (subservice) { return subservice !== undefined; });
                    return [4 /*yield*/, mongoose_1.Item.find({
                            type: mongoose_1.MONGO_TYPES.ARCHIVE,
                            "data.type": "subreddit",
                            "data.datetime": {
                                $gt: user.data.lastSent,
                            },
                            "data.subreddit": {
                                $in: subreddits,
                            },
                        })];
                case 5:
                    subredditData = _a.sent();
                    return [4 /*yield*/, mongoose_1.Item.find({
                            type: mongoose_1.MONGO_TYPES.ARCHIVE,
                            "data.type": "hackernews",
                            "data.datetime": {
                                $gt: user.data.lastSent,
                            },
                        })
                            .sort({ "data.datetime": -1 })
                            .limit(1)];
                case 6:
                    hackernewsData = (_a.sent())[0];
                    emailText = "Here is your nomodoom email digest:<br/><br/>";
                    if (subredditData.length > 0) {
                        emailText += (0, emailHtmlGenerators_1.generateRedditHtml)(subredditData);
                    }
                    isSubscribedToHackernews = subscriptions.find(function (subscription) { return subscription.data.service === "hackernews"; });
                    if (isSubscribedToHackernews) {
                        emailText += (0, emailHtmlGenerators_1.generateHackernewsHtml)(hackernewsData);
                    }
                    emailText += "<p>Adjust your email settings at <a href=\"https://nomodoom.com\">nomodoom.com</a></p>";
                    return [4 /*yield*/, transporter.sendMail({
                            from: '"nomodoom" <ash@kozukaihabit.com>',
                            to: email,
                            subject: "nomodoom digest ".concat((0, moment_timezone_1.default)()
                                .tz("America/Los_Angeles")
                                .format("MMMM Do YYYY")),
                            html: emailText,
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, logger_1.default)("info", "Email sent to ".concat(email))];
                case 8:
                    _a.sent();
                    mongoEmail = {
                        type: "EMAIL",
                        data: {
                            email: email,
                            content: emailText,
                            datetime: Date.now(),
                        },
                    };
                    return [4 /*yield*/, mongoose_1.Item.create(mongoEmail)];
                case 9:
                    _a.sent();
                    user.data.lastSent = Date.now();
                    user.markModified("data");
                    return [4 /*yield*/, user.save()];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = emailUser;
//# sourceMappingURL=emailUser.js.map