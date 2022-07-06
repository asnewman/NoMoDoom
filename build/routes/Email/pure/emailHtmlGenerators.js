"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRedditHtml = exports.generateHackernewsHtml = void 0;
function generateHackernewsHtml(archive) {
    var hackernewsText = "<h2>Hacker News</h2>";
    var hackernewsData = archive.data;
    __spreadArray([], __read(Array(3).keys()), false).forEach(function (idx) {
        var post = hackernewsData.data[idx];
        hackernewsText += "<a href=".concat(post.link, ">").concat(post.title, "</a><br/>");
        hackernewsText += "Score: ".concat(post.score, "<br/><br/>");
        hackernewsText += "</br>";
    });
    return hackernewsText;
}
exports.generateHackernewsHtml = generateHackernewsHtml;
function generateRedditHtml(archives, isUserPremium) {
    var redditText = "<h2>Reddit</h2>";
    archives.forEach(function (archive) {
        var subredditData = archive.data;
        redditText += "<b>/r/".concat(subredditData.subreddit, ":</b><br/><hr/>");
        subredditData.topPosts.forEach(function (post) {
            redditText += "<a href=".concat(post.url, ">").concat(post.title, "</a><br/>");
            redditText += "Score: ".concat(post.score, "<br/>");
            if (isUserPremium) {
                redditText += "<b>What users are saying:</b><br/>";
                redditText += "<ul>";
                post.topThreeComments.forEach(function (comment) {
                    redditText += "<li><i>".concat(comment.content, "</i><span> <b>- ").concat(comment.user, "</b></li>");
                });
                redditText += "</ul>";
            }
            redditText += "<br/>";
        });
        redditText += "</br>";
    });
    return redditText;
}
exports.generateRedditHtml = generateRedditHtml;
//# sourceMappingURL=emailHtmlGenerators.js.map