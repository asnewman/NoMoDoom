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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopCommentsForPost = exports.getTopPostsForDay = void 0;
var node_html_parser_1 = __importDefault(require("node-html-parser"));
var DAY = 24 * 1000 * 60 * 60;
function getTopPostsForDay(bestPages, currentDatetime, getHackerNewsItem) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, bestPages_1, bestPages_1_1, bestPage, root, titlesHtml, titles, scoresHtml, scores, subtextsHtml, links, datesHtml, dates, idx, titles_1, titles_1_1, title, filteredSortedPosts, commentsPromises, e_1;
        var e_2, _a, e_3, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    posts = [];
                    try {
                        for (bestPages_1 = __values(bestPages), bestPages_1_1 = bestPages_1.next(); !bestPages_1_1.done; bestPages_1_1 = bestPages_1.next()) {
                            bestPage = bestPages_1_1.value;
                            root = (0, node_html_parser_1.default)(bestPage);
                            titlesHtml = root.querySelectorAll(".titleline");
                            titles = titlesHtml.map(function (title) { return title.textContent; });
                            scoresHtml = root.querySelectorAll(".score");
                            scores = scoresHtml.map(function (score) { return score.textContent; });
                            subtextsHtml = root.querySelectorAll(".subtext");
                            links = subtextsHtml.map(function (subtext) { var _a; return (_a = subtext.querySelectorAll("a")[1]) === null || _a === void 0 ? void 0 : _a.attributes.href; });
                            datesHtml = root.querySelectorAll(".age");
                            dates = datesHtml.map(function (date) { return date.attributes.title; });
                            idx = 0;
                            try {
                                for (titles_1 = (e_3 = void 0, __values(titles)), titles_1_1 = titles_1.next(); !titles_1_1.done; titles_1_1 = titles_1.next()) {
                                    title = titles_1_1.value;
                                    posts.push({
                                        title: title,
                                        score: parseInt(scores[idx]),
                                        link: "https://news.ycombinator.com/".concat(links[idx]),
                                        date: new Date(dates[idx]),
                                        comments: [],
                                    });
                                    idx++;
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (titles_1_1 && !titles_1_1.done && (_b = titles_1.return)) _b.call(titles_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (bestPages_1_1 && !bestPages_1_1.done && (_a = bestPages_1.return)) _a.call(bestPages_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    filteredSortedPosts = posts
                        .filter(function (a) { return a.date.getTime() > currentDatetime - DAY; })
                        .sort(function (a, b) { return b.score - a.score; });
                    commentsPromises = [];
                    filteredSortedPosts.forEach(function (post) {
                        var regexRes = /(?:id=)(.*)/g.exec(post.link);
                        var postId = regexRes ? parseInt(regexRes[1]) : null;
                        if (postId) {
                            commentsPromises.push(getTopCommentsForPost(postId, getHackerNewsItem).then(function (comments) {
                                post.comments = comments;
                            }));
                        }
                    });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(commentsPromises)];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    console.error("failed to get commentsPromises", e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, filteredSortedPosts];
            }
        });
    });
}
exports.getTopPostsForDay = getTopPostsForDay;
function getTopCommentsForPost(postId, getHackerNewsItem) {
    return __awaiter(this, void 0, void 0, function () {
        var res, post, cmtIdx, comment, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, getHackerNewsItem(postId)];
                case 2:
                    post = (_a.sent());
                    cmtIdx = 0;
                    _a.label = 3;
                case 3:
                    if (!(cmtIdx < 3)) return [3 /*break*/, 6];
                    if (!post.kids[cmtIdx]) return [3 /*break*/, 5];
                    return [4 /*yield*/, getHackerNewsItem(post.kids[cmtIdx])];
                case 4:
                    comment = (_a.sent());
                    res.push({ user: comment.by, content: comment.text || "" });
                    _a.label = 5;
                case 5:
                    cmtIdx++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_4 = _a.sent();
                    console.error("failed to getTopCommentsForPosts");
                    console.error(e_4);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, res];
            }
        });
    });
}
exports.getTopCommentsForPost = getTopCommentsForPost;
//# sourceMappingURL=index.js.map