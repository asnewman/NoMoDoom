"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailEvents = exports.generateArchiveEvents = void 0;
function generateArchiveEvents(subscriptions) {
    var res = [];
    var subreddits = subscriptions.map(function (subscription) {
        return subscription.data.subservice;
    });
    var uniqueSubreddits = new Set(subreddits);
    uniqueSubreddits.forEach(function (subreddit) {
        if (subreddit) {
            var eventData = {
                service: "reddit",
                subservice: subreddit,
            };
            res.push(eventData);
        }
    });
    return res;
}
exports.generateArchiveEvents = generateArchiveEvents;
function generateEmailEvents(users, currentTime) {
    var res = [];
    users.forEach(function (user) {
        var nextSendTime = user.data.lastSent + user.data.frequency * 8600000;
        if (nextSendTime <= currentTime) {
            res.push({ email: user.data.email });
        }
    });
    return res;
}
exports.generateEmailEvents = generateEmailEvents;
//# sourceMappingURL=index.js.map