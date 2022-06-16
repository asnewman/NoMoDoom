"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopPostsForDay = void 0;
var node_html_parser_1 = __importDefault(require("node-html-parser"));
var DAY = 24 * 1000 * 60 * 60;
function getTopPostsForDay(bestPages, currentDatetime) {
    var posts = [];
    var _loop_1 = function (bestPage) {
        var root = (0, node_html_parser_1.default)(bestPage);
        var titlesHtml = root.querySelectorAll('.titlelink');
        var titles = titlesHtml.map(function (title) { return title.textContent; });
        var scoresHtml = root.querySelectorAll('.score');
        var scores = scoresHtml.map(function (score) { return score.textContent; });
        var subtextsHtml = root.querySelectorAll('.subtext');
        var links = subtextsHtml.map(function (subtext) { var _a; return (_a = subtext.querySelectorAll("a")[1]) === null || _a === void 0 ? void 0 : _a.attributes.href; });
        var datesHtml = root.querySelectorAll('.age');
        var dates = datesHtml.map(function (date) { return date.attributes.title; });
        titles.forEach(function (title, idx) {
            posts.push({
                title: title,
                score: parseInt(scores[idx]),
                link: "".concat(links[idx]),
                date: new Date(dates[idx])
            });
        });
    };
    for (var _i = 0, bestPages_1 = bestPages; _i < bestPages_1.length; _i++) {
        var bestPage = bestPages_1[_i];
        _loop_1(bestPage);
    }
    return posts.filter(function (a) { return a.date.getTime() > currentDatetime - DAY; });
}
exports.getTopPostsForDay = getTopPostsForDay;
//# sourceMappingURL=index.js.map