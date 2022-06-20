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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopThreePosts = void 0;
function getTopThreePosts(redditPostsData) {
    var e_1, _a;
    var res = [];
    try {
        for (var redditPostsData_1 = __values(redditPostsData), redditPostsData_1_1 = redditPostsData_1.next(); !redditPostsData_1_1.done; redditPostsData_1_1 = redditPostsData_1.next()) {
            var entry = redditPostsData_1_1.value;
            res.push({
                title: entry.data["title"],
                score: entry.data["score"],
                url: "https://www.reddit.com".concat(entry.data["permalink"]),
            });
            if (res.length === 3)
                break;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (redditPostsData_1_1 && !redditPostsData_1_1.done && (_a = redditPostsData_1.return)) _a.call(redditPostsData_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
exports.getTopThreePosts = getTopThreePosts;
//# sourceMappingURL=index.js.map