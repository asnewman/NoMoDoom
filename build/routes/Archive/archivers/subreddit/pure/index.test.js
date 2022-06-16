"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe("Subreddit pure tests", function () {
    it("gets all fields correctly", function () {
        var dummyData = [
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
        ];
        expect((0, _1.getTopThreePosts)(dummyData)).toEqual([
            {
                title: "foo",
                score: 4,
                url: "https://www.reddit.com/r/javascript",
            },
        ]);
    });
    it("limits to 3 posts", function () {
        var dummyData = [
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
            {
                data: {
                    title: "foo",
                    score: 4,
                    permalink: "/r/javascript",
                },
            },
        ];
        expect((0, _1.getTopThreePosts)(dummyData).length).toBe(3);
    });
});
//# sourceMappingURL=index.test.js.map