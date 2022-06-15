"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRedditHtml = exports.generateHackernewsHtml = void 0;
function generateHackernewsHtml(data) {
    var hackernewsText = "<h2>Hacker News</h2>";
    data.forEach(function (post) {
        hackernewsText += "<a href=".concat(post.link, ">").concat(post.title, "</a><br/>");
        hackernewsText += "Score: ".concat(post.score, "<br/><br/>");
        hackernewsText += "</br>";
    });
    return hackernewsText;
}
exports.generateHackernewsHtml = generateHackernewsHtml;
function generateRedditHtml(data) {
    var redditText = "Here is your nomodoom email digest:<br/><br/>";
    data.forEach(function (subreddit) {
        redditText += "<b>/r/".concat(subreddit.subreddit, ":</b><br/><hr/>\"");
        subreddit.topPosts.forEach(function (post) {
            redditText += "<a href=".concat(post.url, ">").concat(post.title, "</a><br/>");
            redditText += "Score: ".concat(post.score, "<br/><br/>");
        });
        redditText += "</br>";
    });
    return redditText;
}
exports.generateRedditHtml = generateRedditHtml;
//# sourceMappingURL=emailHtmlGenerators.js.map