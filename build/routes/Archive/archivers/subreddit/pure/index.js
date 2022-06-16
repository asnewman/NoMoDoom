"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopThreePosts = void 0;
function getTopThreePosts(redditPostsData) {
    var res = [];
    for (var _i = 0, redditPostsData_1 = redditPostsData; _i < redditPostsData_1.length; _i++) {
        var entry = redditPostsData_1[_i];
        res.push({
            title: entry.data["title"],
            score: entry.data["score"],
            url: "https://www.reddit.com".concat(entry.data["permalink"]),
        });
        if (res.length === 3)
            break;
    }
    return res;
}
exports.getTopThreePosts = getTopThreePosts;
//# sourceMappingURL=index.js.map