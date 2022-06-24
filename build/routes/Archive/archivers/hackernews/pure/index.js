"use strict";
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
exports.getTopPostsForDay = void 0;
var node_html_parser_1 = __importDefault(require("node-html-parser"));
var DAY = 24 * 1000 * 60 * 60;
function getTopPostsForDay(bestPages, currentDatetime) {
    var e_1, _a;
    var posts = [];
    var _loop_1 = function (bestPage) {
        var root = (0, node_html_parser_1.default)(bestPage);
        var titlesHtml = root.querySelectorAll(".titlelink");
        var titles = titlesHtml.map(function (title) { return title.textContent; });
        var scoresHtml = root.querySelectorAll(".score");
        var scores = scoresHtml.map(function (score) { return score.textContent; });
        var subtextsHtml = root.querySelectorAll(".subtext");
        var links = subtextsHtml.map(function (subtext) { var _a; return (_a = subtext.querySelectorAll("a")[1]) === null || _a === void 0 ? void 0 : _a.attributes.href; });
        var datesHtml = root.querySelectorAll(".age");
        var dates = datesHtml.map(function (date) { return date.attributes.title; });
        titles.forEach(function (title, idx) {
            posts.push({
                title: title,
                score: parseInt(scores[idx]),
                link: "https://news.ycombinator.com/".concat(links[idx]),
                date: new Date(dates[idx]),
            });
        });
    };
    try {
        for (var bestPages_1 = __values(bestPages), bestPages_1_1 = bestPages_1.next(); !bestPages_1_1.done; bestPages_1_1 = bestPages_1.next()) {
            var bestPage = bestPages_1_1.value;
            _loop_1(bestPage);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bestPages_1_1 && !bestPages_1_1.done && (_a = bestPages_1.return)) _a.call(bestPages_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return posts.filter(function (a) { return a.date.getTime() > currentDatetime - DAY; });
}
exports.getTopPostsForDay = getTopPostsForDay;
//# sourceMappingURL=index.js.map